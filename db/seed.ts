import {
    InsertAdmin,
    InsertAppAlert,
    InsertMatch,
    InsertRedemptionCode,
    InsertTeam,
    adminTable,
    appAlertTable,
    matchTable,
    redemptionCodeTable,
    teamTable
} from './schema';

import { db } from './db';
import { getTableConfig, PgTableWithColumns } from 'drizzle-orm/pg-core';
import { InferModelFromColumns } from 'drizzle-orm';

db.delete(teamTable);

const tables = [teamTable, redemptionCodeTable, matchTable, appAlertTable, adminTable];

const cleanDb = async (tableList: typeof tables) => {
    const deletePromises = tableList.map(t => db.delete(t));
    await Promise.all(deletePromises);
};

const matches: InsertMatch[] = [{}];
