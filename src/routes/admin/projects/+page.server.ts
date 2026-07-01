import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { projects, projectImages } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { uploadToR2, deleteFromR2 } from '$lib/server/r2/upload';
import { parseVideoUrl } from '$lib/video';

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDb(platform?.env as any);

  try {
    const list = await db.select().from(projects).orderBy(asc(projects.sortOrder));
    const allMedia = await db.select().from(projectImages).orderBy(asc(projectImages.sortOrder));

    return {
      projects: list.map(p => ({
        ...p,
        media: allMedia.filter(m => m.projectId === p.id)
      }))
    };
  } catch (err) {
    console.error('Error loading projects list:', err);
    return { projects: [] };
  }
};

export const actions: Actions = {
  create: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();

    const title = data.get('title')?.toString().trim();
    const description = data.get('description')?.toString().trim();
    const category = data.get('category')?.toString().trim();
    const location = data.get('location')?.toString().trim();
    const completionDate = data.get('completionDate')?.toString().trim();
    const clientName = data.get('clientName')?.toString().trim() || null;
    const area = data.get('area')?.toString().trim() || null;
    const budget = data.get('budget')?.toString().trim() || null;
    const isFeatured = data.get('isFeatured') === 'true';
    const sortOrder = Number(data.get('sortOrder') || 0);

    const coverFile = data.get('coverFile') as File;
    const galleryFiles = data.getAll('galleryFiles') as File[];
    const videoUrlsRaw = data.get('galleryVideoUrls')?.toString().trim() || '';

    if (!title || !description || !category || !location || !completionDate) {
      return fail(400, { error: 'Required metadata fields are missing.' });
    }
    if (!coverFile || coverFile.size === 0) {
      return fail(400, { error: 'Project cover image is required.' });
    }

    // Validate video URLs before touching storage
    const videoUrlLines = videoUrlsRaw.split('\n').map(l => l.trim()).filter(Boolean);
    for (const url of videoUrlLines) {
      if (!parseVideoUrl(url)) {
        return fail(400, { error: `Unrecognized video URL: "${url}". Paste a YouTube, Vimeo, or Loom link.` });
      }
    }

    try {
      const coverImageUrl = await uploadToR2(platform?.env as any, await coverFile.arrayBuffer());

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);

      const [insertedProject] = await db
        .insert(projects)
        .values({ title, slug, description, category, location, completionDate, coverImageUrl, clientName, area, budget, isFeatured, sortOrder })
        .returning();

      if (!insertedProject) throw new Error('Database insert failed.');

      let sortIdx = 10;

      for (const file of galleryFiles) {
        if (file && file.size > 0) {
          const imgKey = await uploadToR2(platform?.env as any, await file.arrayBuffer());
          await db.insert(projectImages).values({ projectId: insertedProject.id, mediaType: 'image', imageUrl: imgKey, sortOrder: sortIdx });
          sortIdx += 10;
        }
      }

      for (const url of videoUrlLines) {
        await db.insert(projectImages).values({ projectId: insertedProject.id, mediaType: 'video', videoUrl: url, sortOrder: sortIdx });
        sortIdx += 10;
      }

      return { success: 'Project created successfully!' };
    } catch (err: any) {
      console.error('Project creation error:', err);
      return fail(500, { error: err.message || 'Failed to create project.' });
    }
  },

  update: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();

    const id = Number(data.get('id'));
    const title = data.get('title')?.toString().trim();
    const description = data.get('description')?.toString().trim();
    const category = data.get('category')?.toString().trim();
    const location = data.get('location')?.toString().trim();
    const completionDate = data.get('completionDate')?.toString().trim();
    const clientName = data.get('clientName')?.toString().trim() || null;
    const area = data.get('area')?.toString().trim() || null;
    const budget = data.get('budget')?.toString().trim() || null;
    const isFeatured = data.get('isFeatured') === 'true';
    const sortOrder = Number(data.get('sortOrder') || 0);

    const coverFile = data.get('coverFile') as File;
    let coverImageUrl = data.get('currentCoverImageUrl')?.toString();
    const galleryFiles = data.getAll('galleryFiles') as File[];
    const deleteMediaIdsStr = data.get('deleteMediaIds')?.toString();
    const videoUrlsRaw = data.get('galleryVideoUrls')?.toString().trim() || '';

    if (!id || !title || !description || !category || !location || !completionDate) {
      return fail(400, { error: 'Required update metadata fields are missing.' });
    }

    const videoUrlLines = videoUrlsRaw.split('\n').map(l => l.trim()).filter(Boolean);
    for (const url of videoUrlLines) {
      if (!parseVideoUrl(url)) {
        return fail(400, { error: `Unrecognized video URL: "${url}". Paste a YouTube, Vimeo, or Loom link.` });
      }
    }

    try {
      if (coverFile && coverFile.size > 0) {
        if (coverImageUrl) await deleteFromR2(platform?.env as any, coverImageUrl);
        coverImageUrl = await uploadToR2(platform?.env as any, await coverFile.arrayBuffer());
      }

      if (deleteMediaIdsStr) {
        const deleteIds = deleteMediaIdsStr.split(',').map(Number).filter(Boolean);
        for (const mediaId of deleteIds) {
          const [record] = await db.select().from(projectImages).where(eq(projectImages.id, mediaId));
          if (record) {
            if (record.mediaType === 'image' && record.imageUrl) {
              await deleteFromR2(platform?.env as any, record.imageUrl);
            }
            await db.delete(projectImages).where(eq(projectImages.id, mediaId));
          }
        }
      }

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + id;

      await db.update(projects).set({ title, slug, description, category, location, completionDate, coverImageUrl, clientName, area, budget, isFeatured, sortOrder, updatedAt: new Date() }).where(eq(projects.id, id));

      const existing = await db.select().from(projectImages).where(eq(projectImages.projectId, id)).orderBy(asc(projectImages.sortOrder));
      let sortIdx = existing.length > 0 ? existing[existing.length - 1].sortOrder + 10 : 10;

      for (const file of galleryFiles) {
        if (file && file.size > 0) {
          const imgKey = await uploadToR2(platform?.env as any, await file.arrayBuffer());
          await db.insert(projectImages).values({ projectId: id, mediaType: 'image', imageUrl: imgKey, sortOrder: sortIdx });
          sortIdx += 10;
        }
      }

      for (const url of videoUrlLines) {
        await db.insert(projectImages).values({ projectId: id, mediaType: 'video', videoUrl: url, sortOrder: sortIdx });
        sortIdx += 10;
      }

      return { success: 'Project updated successfully!' };
    } catch (err: any) {
      console.error('Project update error:', err);
      return fail(500, { error: err.message || 'Failed to update project.' });
    }
  },

  delete: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();
    const id = Number(data.get('id'));

    if (!id) return fail(400, { error: 'Project ID is required.' });

    try {
      const [project] = await db.select().from(projects).where(eq(projects.id, id));
      if (project) await deleteFromR2(platform?.env as any, project.coverImageUrl);

      const mediaRecords = await db.select().from(projectImages).where(eq(projectImages.projectId, id));
      for (const m of mediaRecords) {
        if (m.mediaType === 'image' && m.imageUrl) {
          await deleteFromR2(platform?.env as any, m.imageUrl);
        }
      }

      await db.delete(projects).where(eq(projects.id, id));
      return { success: 'Project deleted successfully!' };
    } catch (err: any) {
      console.error('Project deletion error:', err);
      return fail(500, { error: err.message || 'Failed to delete project.' });
    }
  }
};
