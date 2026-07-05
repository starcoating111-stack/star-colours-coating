import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { services } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { uploadToR2, deleteFromR2 } from '$lib/server/r2/upload';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb(platform?.env as any);

	try {
		const list = await db.select().from(services).orderBy(asc(services.sortOrder));
		return { services: list };
	} catch (err) {
		console.error('Error loading services list:', err);
		return { services: [] };
	}
};

export const actions: Actions = {
	create: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();

		const title = data.get('title')?.toString().trim();
		const description = data.get('description')?.toString().trim();
		const icon = data.get('icon')?.toString().trim() || 'Globe';
		const sortOrder = Number(data.get('sortOrder') || 0);
		const imageFile = data.get('imageFile') as File;

		if (!title || !description) {
			return fail(400, { error: 'Title and description are required.' });
		}

		if (!imageFile || imageFile.size === 0) {
			return fail(400, { error: 'Service cover image is required.' });
		}

		try {
			// 1. Upload image to R2
			const imageUrl = await uploadToR2(platform?.env as any, await imageFile.arrayBuffer());

			// 2. Generate slug from title
			const slug = title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '');

			// 3. Insert into D1
			await db.insert(services).values({
				title,
				slug,
				description,
				imageUrl,
				icon,
				sortOrder
			});

			return { success: 'Service created successfully!' };
		} catch (err: any) {
			console.error('Service creation error:', err);
			return fail(500, { error: err.message || 'Failed to create service.' });
		}
	},

	update: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();

		const id = Number(data.get('id'));
		const title = data.get('title')?.toString().trim();
		const description = data.get('description')?.toString().trim();
		const icon = data.get('icon')?.toString().trim() || 'Globe';
		const sortOrder = Number(data.get('sortOrder') || 0);
		const imageFile = data.get('imageFile') as File;
		let imageUrl = data.get('currentImageUrl')?.toString();

		if (!id || !title || !description) {
			return fail(400, { error: 'Id, title, and description are required.' });
		}

		try {
			// 1. Handle image replacement in R2 if a new file is uploaded
			if (imageFile && imageFile.size > 0) {
				if (imageUrl) {
					await deleteFromR2(platform?.env as any, imageUrl);
				}
				imageUrl = await uploadToR2(platform?.env as any, await imageFile.arrayBuffer());
			}

			// 2. Generate fresh slug from updated title
			const slug = title
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/(^-|-$)/g, '');

			// 3. Update D1 record
			await db
				.update(services)
				.set({
					title,
					slug,
					description,
					imageUrl,
					icon,
					sortOrder,
					updatedAt: new Date()
				})
				.where(eq(services.id, id));

			return { success: 'Service updated successfully!' };
		} catch (err: any) {
			console.error('Service update error:', err);
			return fail(500, { error: err.message || 'Failed to update service.' });
		}
	},

	delete: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();
		const id = Number(data.get('id'));

		if (!id) {
			return fail(400, { error: 'Service ID is required.' });
		}

		try {
			// 1. Fetch current record to get image key
			const [service] = await db.select().from(services).where(eq(services.id, id));
			if (service) {
				// 2. Delete file from R2
				await deleteFromR2(platform?.env as any, service.imageUrl);
			}

			// 3. Delete D1 record
			await db.delete(services).where(eq(services.id, id));

			return { success: 'Service deleted successfully!' };
		} catch (err: any) {
			console.error('Service deletion error:', err);
			return fail(500, { error: err.message || 'Failed to delete service.' });
		}
	}
};
