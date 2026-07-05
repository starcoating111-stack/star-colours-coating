import { redirect, isRedirect, type Handle } from '@sveltejs/kit';
import { getDb } from '$lib/server/db/client';
import { admin } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { verifySession } from '$lib/server/auth/auth';
import { siteConfig } from '$lib/config/site.config';

export const handle: Handle = (async ({ event, resolve }) => {
	const isTargetingAdmin = event.url.pathname.startsWith('/admin');
	const isLoginRoute = event.url.pathname === '/admin/login';

	// 1. Session verification for admin routes
	if (isTargetingAdmin && !isLoginRoute) {
		const sessionCookie = event.cookies.get('session');
		const secret = event.platform?.env?.ADMIN_SESSION_SECRET;

		if (!secret) {
			console.error('ADMIN_SESSION_SECRET is not configured in environment!');
			throw redirect(302, '/admin/login');
		}

		if (!sessionCookie) {
			throw redirect(302, '/admin/login');
		}

		const payload = verifySession(sessionCookie, secret);
		if (!payload) {
			event.cookies.delete('session', { path: '/admin' });
			throw redirect(302, '/admin/login');
		}

		try {
			// Re-validate session cookie against D1 password_changed_at
			const db = getDb(event.platform?.env as any);
			const [adminUser] = await db.select().from(admin).where(eq(admin.id, 1));

			if (!adminUser) {
				event.cookies.delete('session', { path: '/admin' });
				throw redirect(302, '/admin/login');
			}

			// Check if session was issued BEFORE password was changed
			const passwordChangedTime = adminUser.passwordChangedAt
				? adminUser.passwordChangedAt.getTime()
				: 0;
			if (payload.issuedAt < passwordChangedTime) {
				event.cookies.delete('session', { path: '/admin' });
				throw redirect(302, '/admin/login');
			}

			// Session is valid, inject admin context into event locals
			event.locals.isAdmin = true;
		} catch (err) {
			if (isRedirect(err)) {
				throw err;
			}
			console.error('Session validation database error:', err);
			// In case D1 is down, redirect to login to protect the admin panel (fail closed)
			throw redirect(302, '/admin/login');
		}
	}

	// 2. Resolve request
	const response = await resolve(event);

	// 3. Inject standard security headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), payment=()'
	);

	// 4. Dynamically append custom R2 domain to CSP img-src if configured
	let csp = response.headers.get('content-security-policy');
	if (csp) {
		if (siteConfig.imageServingStrategy === 'direct-r2-domain' && siteConfig.directR2Domain) {
			// Prefix the R2 custom domain in the img-src directive
			csp = csp.replace('img-src ', `img-src ${siteConfig.directR2Domain} `);
			response.headers.set('content-security-policy', csp);
		}
	}

	return response;
}) satisfies Handle;
