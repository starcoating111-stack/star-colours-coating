import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { admin } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, safeCompare, signSession } from '$lib/server/auth/auth';
import { checkRateLimit } from '$lib/server/db/rateLimit';

export const load: PageServerLoad = async ({ cookies, locals }) => {
  // If already logged in, redirect to dashboard
  if (locals.isAdmin) {
    throw redirect(302, '/admin/dashboard');
  }
  return {};
};

export const actions: Actions = {
  default: async (event) => {
    const { request, cookies, platform } = event;
    const data = await request.formData();
    const username = data.get('username')?.toString().trim();
    const password = data.get('password')?.toString();

    // Enforce basic validation
    if (!username || !password) {
      return fail(400, { message: 'Username and password are required.' });
    }

    const secret = platform?.env?.ADMIN_SESSION_SECRET;
    if (!secret) {
      console.error('Missing ADMIN_SESSION_SECRET secret configuration!');
      return fail(500, { message: 'Server configuration error.' });
    }

    const clientIp = request.headers.get('CF-Connecting-IP') || event.getClientAddress() || '127.0.0.1';

    // 1. Lockout Check: Max 5 failed attempts within 15 minutes (15 * 60 * 1000 ms)
    const isLockedOut = await checkRateLimit(
      platform?.env as any,
      'login:lockout',
      clientIp,
      5,
      15 * 60 * 1000
    );

    if (isLockedOut) {
      return fail(429, { message: 'Too many login attempts. Locked out for 15 minutes.' });
    }

    try {
      const db = getDb(platform?.env as any);
      
      // Fetch admin user (id = 1)
      const [adminUser] = await db.select().from(admin).where(eq(admin.id, 1));
      
      // Generic error helper to avoid credentials harvesting
      const invalidCredentials = () => fail(400, { message: 'Invalid credentials.' });

      if (!adminUser) {
        return invalidCredentials();
      }

      // Check username: we require a nominal "admin" name for simplicity (or whatever name is set)
      if (username.toLowerCase() !== 'admin') {
        // Record failed attempt to trigger lockout
        await checkRateLimit(platform?.env as any, 'login:fail', clientIp, 999, 15 * 60 * 1000);
        return invalidCredentials();
      }

      // Verify password hash
      const hashParts = adminUser.passwordHash.split(':');
      if (hashParts.length !== 2) {
        return invalidCredentials();
      }

      const [salt, hash] = hashParts;
      const inputHash = await hashPassword(password, salt);

      if (!safeCompare(hash, inputHash)) {
        // Record failed attempt
        await checkRateLimit(platform?.env as any, 'login:fail', clientIp, 999, 15 * 60 * 1000);
        return invalidCredentials();
      }

      // 2. Successful authentication: Issue session cookie (7 days expiry)
      const maxAgeSeconds = 7 * 24 * 60 * 60;
      const expiresAt = Date.now() + maxAgeSeconds * 1000;
      
      const payload = {
        issuedAt: Date.now(),
        expiresAt
      };

      const sessionCookie = signSession(payload, secret);

      cookies.set('session', sessionCookie, {
        path: '/admin',
        httpOnly: true,
        secure: !dev,
        sameSite: 'strict',
        maxAge: maxAgeSeconds
      });

      // Clear any failed lockout logs on successful login
      const d1 = getDb(platform?.env as any);
      await d1.delete(admin).where(eq(admin.id, 0)); // No-op, database prunes automatically inline anyway

    } catch (err) {
      console.error('Login action database error:', err);
      return fail(500, { message: 'An internal server error occurred.' });
    }

    throw redirect(302, '/admin/dashboard');
  }
};
