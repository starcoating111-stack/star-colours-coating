import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// Emulate Cloudflare platform.env (D1, R2, secrets from .dev.vars)
			// during `vite dev` using Wrangler's getPlatformProxy() internally.
			// This is the official adapter-cloudflare local dev path.
			platformProxy: {
				configPath: './wrangler.toml',
				environment: undefined,
				experimentalJsonConfig: false,
				persist: true
			}
		}),
		csp: {
			mode: 'nonce',
			directives: {
				'default-src': ['self'],
				'script-src': ['self'],
				'style-src': ['self', 'unsafe-inline'],
				'img-src': ['self', 'data:', 'blob:', 'https://img.youtube.com'],
				'frame-src': ['https://www.youtube.com', 'https://player.vimeo.com', 'https://www.loom.com'],
				'frame-ancestors': ['none'],
				'object-src': ['none']
			}
		},
		typescript: {
			config: (config) => ({
				...config,
				include: [...config.include, '../drizzle.config.ts']
			})
		}
	}
};

export default config;
