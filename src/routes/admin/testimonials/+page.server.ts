import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { testimonials } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { uploadToR2, deleteFromR2 } from '$lib/server/r2/upload';

export const load: PageServerLoad = async ({ platform }) => {
	const db = getDb(platform?.env as any);

	try {
		const list = await db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
		return { testimonials: list };
	} catch (err) {
		console.error('Error loading testimonials:', err);
		return { testimonials: [] };
	}
};

export const actions: Actions = {
	create: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();

		const name = data.get('name')?.toString().trim();
		const designation = data.get('designation')?.toString().trim() || null;
		const review = data.get('review')?.toString().trim();
		const rating = Number(data.get('rating') || 5);
		const isFeatured = data.get('isFeatured') === 'true';
		const sortOrder = Number(data.get('sortOrder') || 0);
		const photoFile = data.get('photoFile') as File;

		if (!name || !review) {
			return fail(400, { error: 'Name and review are required.' });
		}

		try {
			let photoUrl = null;
			if (photoFile && photoFile.size > 0) {
				photoUrl = await uploadToR2(platform?.env as any, await photoFile.arrayBuffer());
			}

			await db.insert(testimonials).values({
				name,
				designation,
				review,
				rating,
				photoUrl,
				isFeatured,
				sortOrder
			});

			return { success: 'Testimonial created successfully!' };
		} catch (err: any) {
			console.error('Testimonial creation error:', err);
			return fail(500, { error: err.message || 'Failed to create testimonial.' });
		}
	},

	update: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();

		const id = Number(data.get('id'));
		const name = data.get('name')?.toString().trim();
		const designation = data.get('designation')?.toString().trim() || null;
		const review = data.get('review')?.toString().trim();
		const rating = Number(data.get('rating') || 5);
		const isFeatured = data.get('isFeatured') === 'true';
		const sortOrder = Number(data.get('sortOrder') || 0);
		const photoFile = data.get('photoFile') as File;
		let photoUrl = data.get('currentPhotoUrl')?.toString() || null;

		if (!id || !name || !review) {
			return fail(400, { error: 'Required update metadata fields are missing.' });
		}

		try {
			if (photoFile && photoFile.size > 0) {
				if (photoUrl) {
					await deleteFromR2(platform?.env as any, photoUrl);
				}
				photoUrl = await uploadToR2(platform?.env as any, await photoFile.arrayBuffer());
			}

			await db
				.update(testimonials)
				.set({
					name,
					designation,
					review,
					rating,
					photoUrl,
					isFeatured,
					sortOrder
				})
				.where(eq(testimonials.id, id));

			return { success: 'Testimonial updated successfully!' };
		} catch (err: any) {
			console.error('Testimonial update error:', err);
			return fail(500, { error: err.message || 'Failed to update testimonial.' });
		}
	},

	delete: async ({ request, platform }) => {
		const db = getDb(platform?.env as any);
		const data = await request.formData();
		const id = Number(data.get('id'));

		if (!id) {
			return fail(400, { error: 'Testimonial ID is required.' });
		}

		try {
			const [item] = await db.select().from(testimonials).where(eq(testimonials.id, id));
			if (item && item.photoUrl) {
				await deleteFromR2(platform?.env as any, item.photoUrl);
			}

			await db.delete(testimonials).where(eq(testimonials.id, id));

			return { success: 'Testimonial deleted successfully.' };
		} catch (err: any) {
			console.error('Testimonial deletion error:', err);
			return fail(500, { error: err.message || 'Failed to delete testimonial.' });
		}
	}
};
