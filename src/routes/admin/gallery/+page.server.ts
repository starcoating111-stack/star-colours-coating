import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { gallery } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { uploadToR2, deleteFromR2 } from '$lib/server/r2/upload';

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDb(platform?.env as any);

  try {
    const list = await db.select().from(gallery).orderBy(asc(gallery.sortOrder));
    return { gallery: list };
  } catch (err) {
    console.error('Error loading gallery list:', err);
    return { gallery: [] };
  }
};

export const actions: Actions = {
  upload: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();

    const category = data.get('category')?.toString().trim() || null;
    const caption = data.get('caption')?.toString().trim() || null;
    const sortOrder = Number(data.get('sortOrder') || 0);
    const imageFile = data.get('imageFile') as File;

    if (!imageFile || imageFile.size === 0) {
      return fail(400, { error: 'Image file is required.' });
    }

    try {
      // 1. Upload file to R2
      const imageUrl = await uploadToR2(platform?.env as any, await imageFile.arrayBuffer());

      // 2. Insert record in D1
      await db.insert(gallery).values({
        imageUrl,
        category,
        caption,
        sortOrder
      });

      return { success: 'Image uploaded successfully to gallery!' };
    } catch (err: any) {
      console.error('Gallery upload error:', err);
      return fail(500, { error: err.message || 'Failed to upload image.' });
    }
  },

  delete: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();
    const id = Number(data.get('id'));

    if (!id) {
      return fail(400, { error: 'Image ID is required.' });
    }

    try {
      // 1. Fetch record
      const [item] = await db.select().from(gallery).where(eq(gallery.id, id));
      if (item) {
        // 2. Delete file from R2
        await deleteFromR2(platform?.env as any, item.imageUrl);
      }

      // 3. Delete record from D1
      await db.delete(gallery).where(eq(gallery.id, id));

      return { success: 'Image deleted from gallery.' };
    } catch (err: any) {
      console.error('Gallery image deletion error:', err);
      return fail(500, { error: err.message || 'Failed to delete gallery item.' });
    }
  }
};
