import { drizzle } from 'drizzle-orm/neon-serverless';
import { neonConfig, Pool } from '@neondatabase/serverless';
import { config } from 'dotenv';
import ws from 'ws';

/**
 * This is a little strange because it means we're always developing
 * in Neon, even when we're developing locally.
 *
 * I can see a world where we want to spin this up in Docker on our local machine
 * and only use neon in production.
 *
 * We have to use neon-serverless for now because neon-http doesn't support transactions.
 * We have to bring our own websocket client.
 *
 * https://orm.drizzle.team/docs/get-started-postgresql#neon-postgres
 */
config({ path: '.env' }); //todo -- this doesn't seem to work as intended. I had to load .env to get this to work.

neonConfig.webSocketConstructor = ws;
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);
