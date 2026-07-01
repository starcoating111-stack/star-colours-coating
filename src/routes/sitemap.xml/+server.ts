import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db/client';
import { services, projects } from '$lib/server/db/schema';

export const GET: RequestHandler = async ({ url, platform }) => {
  const siteUrl = platform?.env?.PUBLIC_SITE_URL || url.origin;
  const db = getDb(platform?.env as any);

  let servicesList: any[] = [];
  let projectsList: any[] = [];

  try {
    servicesList = await db.select({ slug: services.slug }).from(services);
    projectsList = await db.select({ slug: projects.slug }).from(projects);
  } catch (err) {
    console.error('Failed to query database for sitemap generation:', err);
    // If D1 is not available, we fall back to static routes only
  }

  const staticRoutes = [
    { path: '', priority: '1.0' },
    { path: '/about', priority: '0.8' },
    { path: '/services', priority: '0.8' },
    { path: '/projects', priority: '0.8' },
    { path: '/gallery', priority: '0.6' },
    { path: '/team', priority: '0.7' },
    { path: '/testimonials', priority: '0.6' },
    { path: '/faqs', priority: '0.5' },
    { path: '/contact', priority: '0.9' },
    { path: '/privacy', priority: '0.4' },
    { path: '/terms', priority: '0.4' }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${siteUrl}${route.path}</loc>
    <priority>${route.priority}</priority>
  </url>`
    )
    .join('')}
  ${servicesList
    .map(
      (s) => `
  <url>
    <loc>${siteUrl}/services/${s.slug}</loc>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
  ${projectsList
    .map(
      (p) => `
  <url>
    <loc>${siteUrl}/projects/${p.slug}</loc>
    <priority>0.7</priority>
  </url>`
    )
    .join('')}
</urlset>`;

  return new Response(xml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400' // cache for 24 hours
    }
  });
};
