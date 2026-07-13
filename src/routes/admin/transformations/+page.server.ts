import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { transformations } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { uploadToR2, deleteFromR2 } from '$lib/server/r2/upload';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb(platform?.env as any);

	try {
		const list = await db.select().from(transformations).orderBy(asc(transformations.sortOrder));
		return { transformations: list };
	} catch (err) {
		console.error('Error loading transformations:', err);
		return { transformations: [] };
	}
};

export const actions: Actions = {
	create: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();

		const title = data.get('title')?.toString().trim() || '';
		const challenge = data.get('challenge')?.toString().trim() || '';
		const result = data.get('result')?.toString().trim() || '';
		const sortOrder = Number(data.get('sortOrder') || 0);
		const beforeFile = data.get('beforeImage') as File;
		const afterFile = data.get('afterImage') as File;

		if (!title || !challenge || !result) {
			return fail(400, { error: 'Title, challenge, and result are required.' });
		}
		if (!beforeFile || beforeFile.size === 0 || !afterFile || afterFile.size === 0) {
			return fail(400, { error: 'Both before and after images are required.' });
		}

		try {
			const beforeImageUrl = await uploadToR2(platform?.env as any, await beforeFile.arrayBuffer());
			const afterImageUrl = await uploadToR2(platform?.env as any, await afterFile.arrayBuffer());

			await db.insert(transformations).values({
				title,
				challenge,
				result,
				beforeImageUrl,
				afterImageUrl,
				sortOrder
			});

			return { success: 'Transformation added successfully!' };
		} catch (err: any) {
			console.error('Transformation create error:', err);
			return fail(500, { error: err.message || 'Failed to create transformation.' });
		}
	},

	update: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();

		const id = Number(data.get('id'));
		const title = data.get('title')?.toString().trim() || '';
		const challenge = data.get('challenge')?.toString().trim() || '';
		const result = data.get('result')?.toString().trim() || '';
		const sortOrder = Number(data.get('sortOrder') || 0);
		const beforeFile = data.get('beforeImage') as File | null;
		const afterFile = data.get('afterImage') as File | null;

		if (!id || !title || !challenge || !result) {
			return fail(400, { error: 'All text fields are required.' });
		}

		try {
			const [existing] = await db
				.select()
				.from(transformations)
				.where(eq(transformations.id, id));
			if (!existing) return fail(404, { error: 'Transformation not found.' });

			let beforeImageUrl = existing.beforeImageUrl;
			let afterImageUrl = existing.afterImageUrl;

			// Replace before image if a new one was uploaded
			if (beforeFile && beforeFile.size > 0) {
				beforeImageUrl = await uploadToR2(platform?.env as any, await beforeFile.arrayBuffer());
				await deleteFromR2(platform?.env as any, existing.beforeImageUrl);
			}

			// Replace after image if a new one was uploaded
			if (afterFile && afterFile.size > 0) {
				afterImageUrl = await uploadToR2(platform?.env as any, await afterFile.arrayBuffer());
				await deleteFromR2(platform?.env as any, existing.afterImageUrl);
			}

			await db
				.update(transformations)
				.set({ title, challenge, result, beforeImageUrl, afterImageUrl, sortOrder })
				.where(eq(transformations.id, id));

			return { success: 'Transformation updated successfully!' };
		} catch (err: any) {
			console.error('Transformation update error:', err);
			return fail(500, { error: err.message || 'Failed to update transformation.' });
		}
	},

	delete: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();
		const id = Number(data.get('id'));

		if (!id) return fail(400, { error: 'Transformation ID is required.' });

		try {
			const [item] = await db.select().from(transformations).where(eq(transformations.id, id));
			if (item) {
				await deleteFromR2(platform?.env as any, item.beforeImageUrl);
				await deleteFromR2(platform?.env as any, item.afterImageUrl);
			}

			await db.delete(transformations).where(eq(transformations.id, id));

			return { success: 'Transformation deleted.' };
		} catch (err: any) {
			console.error('Transformation delete error:', err);
			return fail(500, { error: err.message || 'Failed to delete transformation.' });
		}
	}
};
