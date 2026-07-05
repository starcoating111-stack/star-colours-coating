import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { projects, gallery, messages } from '$lib/server/db/schema';
import { count, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb(platform?.env as any);

	try {
		// 1. Fetch counts
		const [projectCountResult] = await db.select({ count: count() }).from(projects);
		const [galleryCountResult] = await db.select({ count: count() }).from(gallery);
		const [messagesCountResult] = await db.select({ count: count() }).from(messages);

		// 2. Fetch recent messages
		const recentMessages = await db
			.select()
			.from(messages)
			.orderBy(desc(messages.createdAt))
			.limit(5);

		// 3. Fetch recent projects
		const recentProjects = await db
			.select()
			.from(projects)
			.orderBy(desc(projects.createdAt))
			.limit(5);

		return {
			vapidPublicKey: (platform?.env as any)?.VAPID_PUBLIC_KEY ?? null,
			stats: {
				totalProjects: projectCountResult?.count ?? 0,
				totalGallery: galleryCountResult?.count ?? 0,
				totalMessages: messagesCountResult?.count ?? 0
			},
			recentMessages: recentMessages.map((m) => ({
				...m,
				createdAt: m.createdAt ? m.createdAt.toISOString() : null
			})),
			recentProjects: recentProjects.map((p) => ({
				...p,
				createdAt: p.createdAt ? p.createdAt.toISOString() : null
			}))
		};
	} catch (err) {
		console.error('Error loading dashboard stats:', err);
		return {
			vapidPublicKey: (platform?.env as any)?.VAPID_PUBLIC_KEY ?? null,
			stats: { totalProjects: 0, totalGallery: 0, totalMessages: 0 },
			recentMessages: [],
			recentProjects: []
		};
	}
};
