import type { LayoutServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { settings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals, platform }) => {
  if (locals.isAdmin) {
    const db = getDb(platform?.env as any);
    const [config] = await db.select().from(settings).where(eq(settings.id, 1));
    return {
      isAdmin: true,
      companyName: config?.companyName ?? 'Client Site'
    };
  }
  return { isAdmin: false };
};
