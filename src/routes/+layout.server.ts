import type { LayoutServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { settings } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { building } from '$app/environment';

export const load: LayoutServerLoad = async ({ locals, platform }) => {
  if (building || !platform?.env?.DB) {
    return {
      settings: {
        companyName: 'Client Site',
        tagline: 'Crafting High-Performance Web Solutions',
        phone: '',
        email: '',
        address: '',
        workingHours: '',
        socialLinks: {}
      },
      isAdmin: false
    };
  }

  const db = getDb(platform.env as any);

  try {
    const [config] = await db.select().from(settings).where(eq(settings.id, 1));
    return {
      settings: config ?? {
        companyName: 'Client Site',
        tagline: 'Crafting High-Performance Web Solutions',
        phone: '',
        email: '',
        address: '',
        workingHours: '',
        socialLinks: {}
      },
      isAdmin: locals.isAdmin ?? false
    };
  } catch (err) {
    console.error('Error loading global layout settings:', err);
    return {
      settings: {
        companyName: 'Client Site',
        tagline: 'Crafting High-Performance Web Solutions',
        phone: '',
        email: '',
        address: '',
        workingHours: '',
        socialLinks: {}
      },
      isAdmin: locals.isAdmin ?? false
    };
  }
};
