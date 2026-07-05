import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { testimonials } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform, setHeaders }) => {
	setHeaders({
		'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
	});
	const db = getDb(platform?.env as any);
	try {
		const list = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
		return { testimonials: list };
	} catch (err) {
		console.error('Failed to load public testimonials:', err);
		return { testimonials: [] };
	}
};
