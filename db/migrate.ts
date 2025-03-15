import { migrate } from 'drizzle-orm/pglite/migrator';

import { db } from './db';

async function applyMigrations() {
    await migrate(db, {
        migrationsFolder: 'migrations' // set to your drizzle generated path
    });
}

export { applyMigrations };
