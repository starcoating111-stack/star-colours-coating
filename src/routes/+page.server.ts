import type { PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { services, projects, testimonials, faq, teamMembers, transformations } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { siteConfig } from '$lib/config/site.config';

export const load: PageServerLoad = async ({ platform, setHeaders }) => {
	setHeaders({
		'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
	});
	const db = getDb(platform?.env as any);

	try {
		const servicesList = await db.select().from(services).orderBy(asc(services.sortOrder)).limit(6);
		const projectsList = await db
			.select()
			.from(projects)
			.where(eq(projects.isFeatured, true))
			.orderBy(asc(projects.sortOrder))
			.limit(4);
		const testimonialsList = await db
			.select()
			.from(testimonials)
			.where(eq(testimonials.isFeatured, true))
			.orderBy(asc(testimonials.sortOrder))
			.limit(3);
		const faqsList = await db.select().from(faq).orderBy(asc(faq.sortOrder)).limit(4);

		const teamList = siteConfig.homepageModules.includes('teamPreview')
			? await db
					.select()
					.from(teamMembers)
					.where(eq(teamMembers.isActive, true))
					.orderBy(asc(teamMembers.sortOrder))
			: [];

		const transformationsList = siteConfig.homepageModules.includes('transformations')
			? await db.select().from(transformations).orderBy(asc(transformations.sortOrder))
			: [];

		return {
			services: servicesList,
			projects: projectsList,
			testimonials: testimonialsList,
			faqs: faqsList,
			teamMembers: teamList,
			transformations: transformationsList
		};
	} catch (err) {
		console.error('Error loading homepage server data:', err);
		return {
			services: [],
			projects: [],
			testimonials: [],
			faqs: [],
			teamMembers: [],
			transformations: []
		};
	}
};
