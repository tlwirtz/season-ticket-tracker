import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

/**
 * This is a little strange because it means we're always developing
 * in Neon, even when we're developing locally.
 *
 * I can see a world where we want to spin this up in Docker on our local machine
 * and only use neon in production.
 */
config({ path: '.env' }); //todo -- this doesn't seem to work as intended. I had to load .env to get this to work.
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
