import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDb } from '$lib/server/db/client';
import { pushSubscriptions } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

// Store or replace a push subscription (upsert by endpoint)
export const POST: RequestHandler = async ({ request, platform }) => {
  const sub = await request.json() as { endpoint?: string; keys?: { p256dh?: string; auth?: string } };

  if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) {
    return json({ error: 'Invalid subscription object' }, { status: 400 });
  }

  const db = getDb(platform?.env as any);

  await db
    .insert(pushSubscriptions)
    .values({ endpoint: sub.endpoint, keys: JSON.stringify(sub.keys) })
    .onConflictDoUpdate({
      target: pushSubscriptions.endpoint,
      set: { keys: JSON.stringify(sub.keys) }
    });

  return json({ ok: true }, { status: 201 });
};

// Remove a push subscription (admin explicitly disables or subscription expired)
export const DELETE: RequestHandler = async ({ request, platform }) => {
  const body = await request.json() as { endpoint?: string };
  if (!body?.endpoint) return json({ error: 'Missing endpoint' }, { status: 400 });

  const db = getDb(platform?.env as any);
  await db.delete(pushSubscriptions).where(eq(pushSubscriptions.endpoint, body.endpoint));

  return json({ ok: true });
};
