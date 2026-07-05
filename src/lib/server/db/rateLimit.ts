import { getDb } from './client';
import { rateLimits } from './schema';
import { and, eq, lt, count } from 'drizzle-orm';

/**
 * Checks if the rate limit has been exceeded for a given key and IP.
 * Prunes expired entries for the key inline.
 *
 * @param env Cloudflare platform env object (containing DB binding)
 * @param key The namespace key, e.g. 'login' or 'contact'
 * @param ip The IP address of the requester
 * @param limit The maximum allowed attempts in the window
 * @param windowMs The time window in milliseconds (e.g. 15 minutes = 15 * 60 * 1000)
 * @returns Promise<boolean> true if rate limit is exceeded (blocked), false otherwise
 */
export async function checkRateLimit(
	env: { DB: D1Database },
	key: string,
	ip: string,
	limit: number,
	windowMs: number
): Promise<boolean> {
	const db = getDb(env);
	const now = Date.now();
	const windowStart = new Date(now - windowMs);

	try {
		// 1. Prune expired entries for this specific key
		await db
			.delete(rateLimits)
			.where(and(eq(rateLimits.key, key), lt(rateLimits.attemptedAt, windowStart)));

		// 2. Count active attempts for this IP & key
		const [result] = await db
			.select({ count: count() })
			.from(rateLimits)
			.where(and(eq(rateLimits.key, key), eq(rateLimits.ipAddress, ip)));

		const activeAttempts = result?.count ?? 0;

		// 3. Log the attempt
		await db.insert(rateLimits).values({
			key,
			ipAddress: ip,
			attemptedAt: new Date(now)
		});

		// 4. Return true if we exceed the limit
		return activeAttempts >= limit;
	} catch (err) {
		console.error('Rate limit database error:', err);
		// Fail open or fail closed? Standard is fail open so database downtime doesn't brick the app,
		// but log the error clearly.
		return false;
	}
}
