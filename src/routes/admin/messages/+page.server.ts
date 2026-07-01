import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { getDb } from '$lib/server/db/client';
import { messages } from '$lib/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform }) => {
  const db = getDb(platform?.env as any);

  try {
    const list = await db.select().from(messages).orderBy(desc(messages.createdAt));
    return {
      messages: list.map(m => ({
        ...m,
        createdAt: m.createdAt ? m.createdAt.toISOString() : null
      }))
    };
  } catch (err) {
    console.error('Error loading messages list:', err);
    return { messages: [] };
  }
};

export const actions: Actions = {
  updateStatus: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();

    const id = Number(data.get('id'));
    const status = data.get('status')?.toString() as 'new' | 'read' | 'archived';

    if (!id || !status || !['new', 'read', 'archived'].includes(status)) {
      return fail(400, { error: 'Invalid message ID or status.' });
    }

    try {
      await db
        .update(messages)
        .set({ status })
        .where(eq(messages.id, id));

      return { success: `Message marked as ${status}.` };
    } catch (err: any) {
      console.error('Message status update error:', err);
      return fail(500, { error: 'Failed to update message status.' });
    }
  },

  delete: async ({ request, platform }) => {
    const db = getDb(platform?.env as any);
    const data = await request.formData();
    const id = Number(data.get('id'));

    if (!id) {
      return fail(400, { error: 'Message ID is required.' });
    }

    try {
      await db.delete(messages).where(eq(messages.id, id));
      return { success: 'Message deleted successfully.' };
    } catch (err: any) {
      console.error('Message deletion error:', err);
      return fail(500, { error: 'Failed to delete message.' });
    }
  }
};
