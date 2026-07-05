import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, platform }) => {
	const key = params.key;

	if (!key) {
		throw error(400, 'Image key is required.');
	}

	// Guard: Check that the R2 bucket binding is configured
	const bucket = platform?.env?.BUCKET;
	if (!bucket) {
		console.error('BUCKET binding is missing from App.Platform environment.');
		throw error(500, 'Storage bucket configuration is missing.');
	}

	try {
		// Fetch the object from R2
		const object = await bucket.get(key);

		if (!object) {
			throw error(404, 'Image not found.');
		}

		// Set up standard headers for public streaming and strong client caching
		const headers = new Headers();
		headers.set('Content-Type', object.httpMetadata?.contentType || 'application/octet-stream');
		headers.set('Cache-Control', 'public, max-age=31536000, immutable');
		if (object.httpEtag) {
			headers.set('ETag', object.httpEtag);
		}

		// Return the response streaming the object body
		return new Response(object.body, {
			headers
		});
	} catch (err: any) {
		if (err.status === 404) throw err;
		console.error(`Error serving image "${key}" from R2:`, err);
		throw error(500, 'Internal server error serving asset.');
	}
};
