import {
    SelectTeam,
    adminTable,
    appAlertTable,
    matchTable,
    redemptionCodeTable,
    teamTable,
    ticketRedemptionTable
} from './schema';
import { db } from './db';
import {
    generateFakeTeams,
    generateFakeMatches,
    generateFakeAdmins,
    generateFakeRedemptionCodes
} from './fake-data-generators';

type TableArray = typeof tables;
const tables = [
    ticketRedemptionTable,
    redemptionCodeTable,
    matchTable,
    appAlertTable,
    adminTable,
    teamTable
];

const cleanDb = async (tableList: TableArray) => {
    for (const table of tableList) {
        await db.delete(table);
    }
};

export const generateTeams = async (numOfTeams: number) => {
    const teams = generateFakeTeams(numOfTeams);
    return await db.insert(teamTable).values(teams).returning();
};

export const generateMatches = async (numOfMatches: number, teams: SelectTeam[]) => {
    const matches = generateFakeMatches(numOfMatches, teams);
    return await db.insert(matchTable).values(matches).returning();
};

export const generateAdmins = async (numOfAdmins: number) => {
    const admins = generateFakeAdmins(numOfAdmins);
    return await db.insert(adminTable).values(admins).returning();
};

export const generateRedemptionCodes = async (numOfCodes: number) => {
    const codes = generateFakeRedemptionCodes(numOfCodes);
    return await db.insert(redemptionCodeTable).values(codes).returning();
};

export async function main(showLogs = true) {
    await cleanDb(tables);
    const teams = await generateTeams(30);
    const matches = await generateMatches(30, teams);
    const admins = await generateAdmins(2);
    const codes = await generateRedemptionCodes(2);

    if (showLogs) {
        console.log(teams);
        console.log(matches);
        console.log(admins);
        console.log(codes);
    }
}

// main();
