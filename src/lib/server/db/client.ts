import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export function getDb(env: { DB: D1Database }) {
	if (!env || !env.DB) {
		throw new Error('D1 Database binding (DB) is missing. Verify wrangler.toml configuration.');
	}
	return drizzle(env.DB, { schema });
}
