import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	// Delete the session cookie
	cookies.delete('session', { path: '/admin' });

	// Redirect to login page
	throw redirect(302, '/admin/login');
};
