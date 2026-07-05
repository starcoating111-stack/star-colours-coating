import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { projects } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform, setHeaders }) => {
	setHeaders({
		'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=300'
	});
	const db = getDb(platform?.env as any);
	try {
		const list = await db.select().from(projects).orderBy(asc(projects.sortOrder));
		return { projects: list };
	} catch (err) {
		console.error('Failed to load public projects:', err);
		return { projects: [] };
	}
};
