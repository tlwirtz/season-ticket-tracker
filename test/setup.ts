import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import { afterAll, afterEach, beforeEach, vi } from 'vitest';

import * as schema from '../db/schema';
import { db } from '../db/db';
import { main } from '../db/seed';
import { applyMigrations } from '../db/migrate';
import { sql } from 'drizzle-orm';

const client = new PGlite();

// Replace the database with a new in-memory database
vi.mock('../db/db.ts', async => {
    const pool = new PGlite();
    const db = drizzle(pool, { schema });
    return {
        db,
        pool
    };
});

// Apply migrations before each test
beforeEach(async () => {
    await applyMigrations();
    await main(false);
}, 15000);

// Clean up the database after each test
afterEach(async () => {
    await db.execute(sql`drop schema if exists public cascade`);
    await db.execute(sql`create schema public`);
    await db.execute(sql`drop schema if exists drizzle cascade`);
}, 15000);

// Free up resources after all tests are done
afterAll(async () => {
    client.close();
});
