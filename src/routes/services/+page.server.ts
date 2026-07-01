import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { services } from '$lib/server/db/schema';
import { asc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
  });
  const db = getDb(platform?.env as any);
  try {
    const list = await db.select().from(services).orderBy(asc(services.sortOrder));
    return { services: list };
  } catch (err) {
    console.error('Failed to load public services:', err);
    return { services: [] };
  }
};
