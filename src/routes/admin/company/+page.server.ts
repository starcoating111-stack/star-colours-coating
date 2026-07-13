import { fail } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { settings, admin } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, safeCompare, generateSalt, signSession } from '$lib/server/auth/auth';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb(platform?.env as any);

	try {
		const [config] = await db.select().from(settings).where(eq(settings.id, 1));
		return {
			settings: config ?? {
				companyName: 'Client Site',
				tagline: '',
				logoUrl: '',
				phone: '',
				email: '',
				address: '',
				workingHours: '',
				googleMapsLink: '',
				whatsappNumber: '',
				socialLinks: {}
			}
		};
	} catch (err) {
		console.error('Error loading settings page:', err);
		return { settings: null };
	}
};

export const actions: Actions = {
	updateSettings: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();

		const companyName = data.get('companyName')?.toString().trim();
		const tagline = data.get('tagline')?.toString().trim();
		const logoUrl = data.get('logoUrl')?.toString().trim();
		const phone = data.get('phone')?.toString().trim();
		const email = data.get('email')?.toString().trim();
		const address = data.get('address')?.toString().trim();
		const workingHours = data.get('workingHours')?.toString().trim();
		const googleMapsLink = data.get('googleMapsLink')?.toString().trim();
		const whatsappNumber = data.get('whatsappNumber')?.toString().trim();
		const whatsappDefaultMessage = data.get('whatsappDefaultMessage')?.toString().trim() || null;

		// Social links parsing
		const facebook = data.get('facebook')?.toString().trim();
		const instagram = data.get('instagram')?.toString().trim();
		const linkedin = data.get('linkedin')?.toString().trim();
		const twitter = data.get('twitter')?.toString().trim();
		const youtube = data.get('youtube')?.toString().trim();

		if (!companyName) {
			return fail(400, { settingsError: 'Company name is required.' });
		}

		if (whatsappDefaultMessage && whatsappDefaultMessage.length > 200) {
			return fail(400, {
				settingsError: 'Default WhatsApp message must be 200 characters or fewer.'
			});
		}

		// Normalize WhatsApp: strip everything except digits, then validate
		const normalizedWhatsApp = whatsappNumber ? whatsappNumber.replace(/[^\d]/g, '') : '';
		if (normalizedWhatsApp) {
			if (normalizedWhatsApp.startsWith('0')) {
				return fail(400, {
					settingsError:
						'WhatsApp number must start with a country code, not 0. Example: 447911123456 for a UK +44 number.'
				});
			}
			if (normalizedWhatsApp.length < 7 || normalizedWhatsApp.length > 15) {
				return fail(400, {
					settingsError:
						'WhatsApp number must be 7–15 digits including country code (no +, spaces, or dashes).'
				});
			}
		}

		const socialLinks = {
			...(facebook && { facebook }),
			...(instagram && { instagram }),
			...(linkedin && { linkedin }),
			...(twitter && { twitter }),
			...(youtube && { youtube })
		};

		try {
			await db
				.update(settings)
				.set({
					companyName,
					tagline,
					logoUrl,
					phone,
					email,
					address,
					workingHours,
					googleMapsLink,
					whatsappNumber: normalizedWhatsApp || null,
					whatsappDefaultMessage: whatsappDefaultMessage || null,
					socialLinks,
					updatedAt: new Date()
				})
				.where(eq(settings.id, 1));

			return { settingsSuccess: 'Company settings updated successfully!' };
		} catch (err: any) {
			console.error('Settings update error:', err);
			return fail(500, { settingsError: 'Failed to update company settings.' });
		}
	},

	updatePassword: async ({ request, cookies, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();

		const currentPassword = data.get('currentPassword')?.toString();
		const newPassword = data.get('newPassword')?.toString();
		const confirmPassword = data.get('confirmPassword')?.toString();

		if (!currentPassword || !newPassword || !confirmPassword) {
			return fail(400, { passwordError: 'All password fields are required.' });
		}

		// Enforce 12+ characters strength limit at API layer
		if (newPassword.length < 12) {
			return fail(400, { passwordError: 'New password must be at least 12 characters long.' });
		}

		if (newPassword !== confirmPassword) {
			return fail(400, { passwordError: 'New passwords do not match.' });
		}

		const secret = platform?.env?.ADMIN_SESSION_SECRET;
		if (!secret) {
			return fail(500, { passwordError: 'Server signature configuration is missing.' });
		}

		try {
			// 1. Fetch current credentials
			const [adminUser] = await db.select().from(admin).where(eq(admin.id, 1));
			if (!adminUser) {
				return fail(400, { passwordError: 'Administrator account not found.' });
			}

			// 2. Verify current password
			const [salt, hash] = adminUser.passwordHash.split(':');
			const verifiedCurrentHash = await hashPassword(currentPassword, salt);

			if (!safeCompare(hash, verifiedCurrentHash)) {
				return fail(400, { passwordError: 'Current password is incorrect.' });
			}

			// 3. Generate fresh credentials and update DB
			const newSalt = generateSalt();
			const newHash = await hashPassword(newPassword, newSalt);
			const passwordHash = `${newSalt}:${newHash}`;
			const now = new Date();

			await db
				.update(admin)
				.set({
					passwordHash,
					passwordChangedAt: now,
					updatedAt: now
				})
				.where(eq(admin.id, 1));

			// 4. Re-sign current session to prevent self-lockout while invalidating other browsers
			const maxAgeSeconds = 7 * 24 * 60 * 60;
			const expiresAt = Date.now() + maxAgeSeconds * 1000;
			const sessionCookie = signSession({ issuedAt: Date.now(), expiresAt }, secret);

			cookies.set('session', sessionCookie, {
				path: '/admin',
				httpOnly: true,
				secure: !dev,
				sameSite: 'strict',
				maxAge: maxAgeSeconds
			});

			return {
				passwordSuccess:
					'Password changed successfully! All other active sessions have been signed out.'
			};
		} catch (err: any) {
			console.error('Password change error:', err);
			return fail(500, { passwordError: 'Failed to update password.' });
		}
	}
};
