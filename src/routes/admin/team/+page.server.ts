import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { teamMembers } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';
import { uploadToR2, deleteFromR2 } from '$lib/server/r2/upload';

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDb(platform?.env as any);
  try {
    const list = await db.select().from(teamMembers).orderBy(asc(teamMembers.sortOrder));
    return { teamMembers: list };
  } catch (err) {
    console.error('Error loading team members:', err);
    return { teamMembers: [] };
  }
};

function validateLinkedinUrl(url: string): boolean {
  return /^https:\/\/(www\.)?linkedin\.com\/in\//.test(url);
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const actions: Actions = {
  create: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();

    const name = data.get('name')?.toString().trim();
    const designation = data.get('designation')?.toString().trim();
    const bio = data.get('bio')?.toString().trim() || null;
    const email = data.get('email')?.toString().trim() || null;
    const linkedinUrl = data.get('linkedinUrl')?.toString().trim() || null;
    const sortOrder = Number(data.get('sortOrder') || 0);
    const photoFile = data.get('photoFile') as File;

    if (!name || !designation) {
      return fail(400, { error: 'Name and designation are required.' });
    }
    if (email && !validateEmail(email)) {
      return fail(400, { error: 'Invalid email address.' });
    }
    if (linkedinUrl && !validateLinkedinUrl(linkedinUrl)) {
      return fail(400, { error: 'LinkedIn URL must start with https://linkedin.com/in/ or https://www.linkedin.com/in/' });
    }

    try {
      let photoUrl = null;
      if (photoFile && photoFile.size > 0) {
        photoUrl = await uploadToR2(platform?.env as any, await photoFile.arrayBuffer());
      }

      await db.insert(teamMembers).values({ name, designation, bio, email, linkedinUrl, photoUrl, sortOrder });
      return { success: 'Team member created.' };
    } catch (err: any) {
      return fail(500, { error: err.message || 'Failed to create team member.' });
    }
  },

  update: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();

    const id = Number(data.get('id'));
    const name = data.get('name')?.toString().trim();
    const designation = data.get('designation')?.toString().trim();
    const bio = data.get('bio')?.toString().trim() || null;
    const email = data.get('email')?.toString().trim() || null;
    const linkedinUrl = data.get('linkedinUrl')?.toString().trim() || null;
    const sortOrder = Number(data.get('sortOrder') || 0);
    const photoFile = data.get('photoFile') as File;
    let photoUrl = data.get('currentPhotoUrl')?.toString() || null;

    if (!id || !name || !designation) {
      return fail(400, { error: 'Name and designation are required.' });
    }
    if (email && !validateEmail(email)) {
      return fail(400, { error: 'Invalid email address.' });
    }
    if (linkedinUrl && !validateLinkedinUrl(linkedinUrl)) {
      return fail(400, { error: 'LinkedIn URL must start with https://linkedin.com/in/ or https://www.linkedin.com/in/' });
    }

    try {
      if (photoFile && photoFile.size > 0) {
        if (photoUrl) await deleteFromR2(platform?.env as any, photoUrl);
        photoUrl = await uploadToR2(platform?.env as any, await photoFile.arrayBuffer());
      }

      await db
        .update(teamMembers)
        .set({ name, designation, bio, email, linkedinUrl, photoUrl, sortOrder, updatedAt: new Date() })
        .where(eq(teamMembers.id, id));

      return { success: 'Team member updated.' };
    } catch (err: any) {
      return fail(500, { error: err.message || 'Failed to update team member.' });
    }
  },

  toggleActive: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();
    const id = Number(data.get('id'));
    const isActive = data.get('isActive') === 'true';

    if (!id) return fail(400, { error: 'ID required.' });

    try {
      await db.update(teamMembers).set({ isActive: !isActive, updatedAt: new Date() }).where(eq(teamMembers.id, id));
      return { success: 'Status updated.' };
    } catch (err: any) {
      return fail(500, { error: err.message || 'Failed to update status.' });
    }
  },

  delete: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();
    const id = Number(data.get('id'));

    if (!id) return fail(400, { error: 'ID required.' });

    try {
      const [item] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
      if (item?.photoUrl) await deleteFromR2(platform?.env as any, item.photoUrl);
      await db.delete(teamMembers).where(eq(teamMembers.id, id));
      return { success: 'Team member deleted.' };
    } catch (err: any) {
      return fail(500, { error: err.message || 'Failed to delete team member.' });
    }
  }
};
