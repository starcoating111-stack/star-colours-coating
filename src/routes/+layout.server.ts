import type { LayoutServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { settings, services } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
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
			services: [],
			isAdmin: false
		};
	}

	const db = getDb(platform.env as any);

	try {
		const [config] = await db.select().from(settings).where(eq(settings.id, 1));
		const servicesList = await db.select().from(services).orderBy(asc(services.sortOrder)).limit(7);
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
			services: servicesList,
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
			services: [],
			isAdmin: locals.isAdmin ?? false
		};
	}
};
