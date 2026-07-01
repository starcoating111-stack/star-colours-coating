import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { projects, projectImages } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, platform, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
  });
  const db = getDb(platform?.env as any);

  try {
    const [project] = await db.select().from(projects).where(eq(projects.slug, params.slug));

    if (!project) {
      throw error(404, 'Project not found');
    }

    const imagesList = await db
      .select()
      .from(projectImages)
      .where(eq(projectImages.projectId, project.id))
      .orderBy(asc(projectImages.sortOrder));

    return {
      project,
      images: imagesList
    };
  } catch (err: any) {
    if (err.status === 404) throw err;
    console.error('Error loading project details page:', err);
    throw error(500, 'Internal server error');
  }
};
