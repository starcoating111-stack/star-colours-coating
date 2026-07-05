import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400'
	});
	return {};
};
