import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { faq } from '$lib/server/db/schema';
import { eq, asc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDb(platform?.env as any);

  try {
    const list = await db.select().from(faq).orderBy(asc(faq.sortOrder));
    return { faqs: list };
  } catch (err) {
    console.error('Error loading FAQs:', err);
    return { faqs: [] };
  }
};

export const actions: Actions = {
  create: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();

    const question = data.get('question')?.toString().trim();
    const answer = data.get('answer')?.toString().trim();
    const sortOrder = Number(data.get('sortOrder') || 0);

    if (!question || !answer) {
      return fail(400, { error: 'Question and answer are required.' });
    }

    try {
      await db.insert(faq).values({
        question,
        answer,
        sortOrder
      });

      return { success: 'FAQ item created successfully!' };
    } catch (err: any) {
      console.error('FAQ creation error:', err);
      return fail(500, { error: err.message || 'Failed to create FAQ item.' });
    }
  },

  update: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();

    const id = Number(data.get('id'));
    const question = data.get('question')?.toString().trim();
    const answer = data.get('answer')?.toString().trim();
    const sortOrder = Number(data.get('sortOrder') || 0);

    if (!id || !question || !answer) {
      return fail(400, { error: 'Id, question, and answer are required.' });
    }

    try {
      await db
        .update(faq)
        .set({
          question,
          answer,
          sortOrder
        })
        .where(eq(faq.id, id));

      return { success: 'FAQ item updated successfully!' };
    } catch (err: any) {
      console.error('FAQ update error:', err);
      return fail(500, { error: err.message || 'Failed to update FAQ item.' });
    }
  },

  delete: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();
    const id = Number(data.get('id'));

    if (!id) {
      return fail(400, { error: 'FAQ ID is required.' });
    }

    try {
      await db.delete(faq).where(eq(faq.id, id));
      return { success: 'FAQ item deleted successfully.' };
    } catch (err: any) {
      console.error('FAQ deletion error:', err);
      return fail(500, { error: err.message || 'Failed to delete FAQ item.' });
    }
  }
};
