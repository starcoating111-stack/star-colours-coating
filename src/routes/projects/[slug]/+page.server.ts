import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { projects, projectImages } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { parseVideoUrl } from '$lib/video';

export const load: PageServerLoad = async ({ params, platform, setHeaders }) => {
	setHeaders({
		'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=300'
	});

	const db = getDb(platform?.env as any);

	try {
		const [project] = await db.select().from(projects).where(eq(projects.slug, params.slug));
		if (!project) throw error(404, 'Project not found');

		const rawMedia = await db
			.select()
			.from(projectImages)
			.where(eq(projectImages.projectId, project.id))
			.orderBy(asc(projectImages.sortOrder));

		const media = rawMedia.map((m) => {
			if (m.mediaType === 'video' && m.videoUrl) {
				const parsed = parseVideoUrl(m.videoUrl);
				return {
					id: m.id,
					mediaType: 'video' as const,
					imageUrl: null,
					embedUrl: parsed?.embedUrl ?? null,
					thumbnailUrl: parsed?.thumbnailUrl ?? null,
					isVertical: parsed?.isVertical ?? false
				};
			}
			return {
				id: m.id,
				mediaType: 'image' as const,
				imageUrl: m.imageUrl,
				embedUrl: null,
				thumbnailUrl: null,
				isVertical: false
			};
		});

		return { project, media };
	} catch (err: any) {
		if (err.status === 404) throw err;
		console.error('Error loading project details page:', err);
		throw error(500, 'Internal server error');
	}
};
