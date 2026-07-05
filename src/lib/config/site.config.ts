export interface SiteConfig {
	industryPreset: string;
	homepageModules: string[];
	seo: {
		siteName: string;
		tagline: string;
		description: string;
		ogImage: string; // fallback OG image (e.g. logo or default cover)
	};
	themeReference: {
		primaryColor: string; // Reference only, actual colors live in Tailwind CSS
		fontFamily: string;
	};
	imageServingStrategy: 'proxy' | 'direct-r2-domain';
	directR2Domain: string; // Used only if strategy is 'direct-r2-domain'
	// Show a persistent floating WhatsApp button on all public pages.
	// Only renders when this is true AND settings.whatsappNumber is set.
	showFloatingWhatsApp: boolean;
}

export const siteConfig: SiteConfig = {
	industryPreset: 'Web Development Agency', // e.g. 'Interior Design', 'Restaurant', etc.
	homepageModules: [
		'hero',
		'services',
		'testimonials',
		'transformations',
		'featuredProjects',
		'teamPreview',
		'contactCta'
	],
	seo: {
		siteName: 'CodeNXT Lab',
		tagline: 'High-Performance Web Solutions',
		description:
			'We build high-performance, self-contained SvelteKit web applications on Cloudflare serverless architecture.',
		ogImage: '/og-default.png'
	},
	themeReference: {
		primaryColor: 'zinc',
		fontFamily: 'Inter'
	},
	imageServingStrategy: 'proxy', // 'proxy' serves from SvelteKit route, 'direct-r2-domain' serves from custom R2 domain
	directR2Domain: 'https://assets.clientdomain.com', // e.g., https://assets.clientdomain.com
	showFloatingWhatsApp: true
};
