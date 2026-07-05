import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { messages, settings, pushSubscriptions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { checkRateLimit } from '$lib/server/db/rateLimit';
import {
	sendEmailViaZeptoMail,
	getClientEmailTemplate,
	getOwnerEmailTemplate
} from '$lib/server/email/zeptomail';
import { sendWebPush, type PushSub } from '$lib/server/webpush';

const WA_DEFAULT_FALLBACK = "Hi, I'm interested in your services.";

export const load: PageServerLoad = async ({ parent }) => {
	const parentData = await parent();
	const s = (parentData as any)?.settings;
	const whatsappNumber = (s?.whatsappNumber ?? '').replace(/[^\d]/g, '') || null;
	const whatsappDefaultMessage = s?.whatsappDefaultMessage?.trim() || WA_DEFAULT_FALLBACK;
	return { whatsappNumber, whatsappDefaultMessage };
};

// Form schema using official Zod
const contactSchema = z.object({
	name: z
		.string()
		.min(2, 'Name must be at least 2 characters.')
		.max(100, 'Name cannot exceed 100 characters.'),
	email: z.string().email('Please enter a valid email address.'),
	phone: z.string().max(30, 'Phone number cannot exceed 30 characters.').nullable().optional(),
	subject: z.string().max(200, 'Subject cannot exceed 200 characters.').nullable().optional(),
	message: z
		.string()
		.min(10, 'Message must be at least 10 characters.')
		.max(5000, 'Message cannot exceed 5000 characters.')
});

export const actions: Actions = {
	default: async (event) => {
		const { request, platform } = event;
		const formData = await request.formData();

		// 1. Honeypot check (hidden field 'website' which bots fill but humans don't)
		const honeypot = formData.get('website')?.toString();
		if (honeypot && honeypot.length > 0) {
			console.log('Spam honeypot caught a submission. Silent success returned.');
			return { success: true, message: 'Thank you! Your message has been sent successfully.' };
		}

		const name = formData.get('name')?.toString().trim();
		const email = formData.get('email')?.toString().trim();
		const phone = formData.get('phone')?.toString().trim() || null;
		const subject = formData.get('subject')?.toString().trim() || null;
		const message = formData.get('message')?.toString().trim();

		// 2. Schema validation
		const validation = contactSchema.safeParse({ name, email, phone, subject, message });
		if (!validation.success) {
			const errorMsg =
				validation.error.issues[0]?.message || 'Invalid form inputs. Please check your data.';
			return fail(400, { error: errorMsg });
		}

		const clientIp =
			request.headers.get('CF-Connecting-IP') || event.getClientAddress() || '127.0.0.1';

		// 3. Rate limiting (max 5 contact submissions per IP per hour)
		const isRateLimited = await checkRateLimit(
			platform?.env as any,
			'contact:rate_limit',
			clientIp,
			5,
			60 * 60 * 1000 // 1 hour window
		);

		if (isRateLimited) {
			return fail(429, { error: 'Too many submissions. Please wait an hour before trying again.' });
		}

		const validatedData = validation.data;

		try {
			const db = getDb(platform?.env as any);

			// 4. Save to Database D1 (parameterized query via Drizzle)
			await db.insert(messages).values({
				name: validatedData.name,
				email: validatedData.email,
				phone: validatedData.phone,
				subject: validatedData.subject,
				message: validatedData.message
			});

			// 5. Send notifications in the background (email + push)
			const apiKey = platform?.env?.ZEPTOMAIL_API_KEY;
			const bounceEmail = platform?.env?.ZEPTOMAIL_BOUNCE_EMAIL;
			const vapidPublicKey = (platform?.env as any)?.VAPID_PUBLIC_KEY;
			const vapidPrivateJwk = (platform?.env as any)?.VAPID_PRIVATE_KEY_JWK;
			const vapidSubject = (platform?.env as any)?.VAPID_SUBJECT ?? 'mailto:admin@example.com';

			const notifyTask = (async () => {
				// 5a. Email (unchanged)
				if (apiKey && bounceEmail) {
					try {
						const [config] = await db.select().from(settings).where(eq(settings.id, 1));
						const companyName = config?.companyName ?? 'Client Site';
						const ownerEmail = config?.email ?? bounceEmail.replace('bounce@', 'hello@');

						await sendEmailViaZeptoMail(
							apiKey,
							bounceEmail,
							companyName,
							validatedData.email,
							validatedData.name,
							`Thank you for contacting ${companyName}`,
							getClientEmailTemplate(companyName, validatedData.name, validatedData.message)
						);
						await sendEmailViaZeptoMail(
							apiKey,
							bounceEmail,
							companyName,
							ownerEmail,
							'Site Administrator',
							`New Inquiry: ${validatedData.subject || 'No Subject'}`,
							getOwnerEmailTemplate(
								companyName,
								validatedData.name,
								validatedData.email,
								validatedData.phone ?? null,
								validatedData.subject ?? null,
								validatedData.message
							)
						);
					} catch (emailErr) {
						console.error('Failed to send notification emails:', emailErr);
					}
				} else {
					console.warn('ZeptoMail API keys are missing. Transactional emails skipped.');
				}

				// 5b. Push notifications (fire-and-forget per subscription)
				if (vapidPublicKey && vapidPrivateJwk) {
					try {
						const subs = await db.select().from(pushSubscriptions);
						const staleIds: number[] = [];

						await Promise.allSettled(
							subs.map(async (row) => {
								try {
									const sub: PushSub = { endpoint: row.endpoint, keys: JSON.parse(row.keys) };
									await sendWebPush(
										sub,
										{
											title: 'New Inquiry',
											body: `From ${validatedData.name}`,
											url: '/admin/messages'
										},
										vapidPublicKey,
										vapidPrivateJwk,
										vapidSubject
									);
								} catch (err: any) {
									if (err?.status === 410) {
										staleIds.push(row.id); // subscription expired — clean up
									} else {
										console.error('Push delivery error:', err?.message);
									}
								}
							})
						);

						// Delete expired subscriptions
						for (const id of staleIds) {
							await db.delete(pushSubscriptions).where(eq(pushSubscriptions.id, id));
						}
					} catch (pushErr) {
						console.error('Push notification query error:', pushErr);
					}
				}
			})();

			if (platform?.ctx?.waitUntil) {
				platform.ctx.waitUntil(notifyTask);
			} else {
				notifyTask; // float in local dev
			}

			return { success: true, message: 'Thank you! Your message has been sent successfully.' };
		} catch (err: any) {
			console.error('Contact form submission database insert failed:', err);
			return fail(500, { error: 'Failed to record your message. Please try again later.' });
		}
	}
};
