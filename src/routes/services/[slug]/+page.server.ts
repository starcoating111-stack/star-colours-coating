import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { services } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, platform, setHeaders }) => {
	setHeaders({
		'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
	});

	const db = getDb(platform?.env as any);

	try {
		const [service] = await db.select().from(services).where(eq(services.slug, params.slug));
		if (!service) throw error(404, 'Service not found');

		return { service };
	} catch (err: any) {
		if (err.status === 404) throw err;
		console.error('Error loading service details page:', err);
		throw error(500, 'Internal server error');
	}
};
