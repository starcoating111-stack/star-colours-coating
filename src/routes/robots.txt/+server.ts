import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url, platform }) => {
	const siteUrl = platform?.env?.PUBLIC_SITE_URL || url.origin;

	const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /admin

Sitemap: ${siteUrl}/sitemap.xml
`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'public, max-age=86400' // cache for 24 hours
		}
	});
};
