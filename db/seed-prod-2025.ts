import { db } from './db';
import neatCSV from 'neat-csv';
import fs from 'fs';
import {
    InsertMatch,
    SelectTeam,
    adminTable,
    appAlertTable,
    matchTable,
    redemptionCodeTable,
    teamTable,
    ticketRedemptionTable
} from './schema';

type TeamDataFromCSV = {
    team_name: string;
    code: string;
    team_logo_file: string;
    team_logo_url: string;
};

type MatchDataFromCSV = {
    home_team: string;
    away_team: string;
    date: string;
    time: string;
    location: string;
    match_type: string;
};

const readTeamData = async () => {
    return await neatCSV(fs.createReadStream('mls-team-spreadsheet.csv'));
};

const readMatchData = async () => {
    return await neatCSV(fs.createReadStream('mls-team-matchups-2025.csv'));
};

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

const generateTeams = async (teamData: TeamDataFromCSV[]) => {
    const mappedData = teamData.map(td => {
        const mapped = {
            name: td.team_name,
            img: td.team_logo_url,
            code: td.code
        };
        return mapped;
    });

    return await db.insert(teamTable).values(mappedData).returning();
};

const generateMatches = async (teamData: SelectTeam[], matchData: MatchDataFromCSV[]) => {
    const mappedData = matchData.map(md => {
        const homeTeam = teamData.find(team => team.code === md.home_team);
        const awayTeam = teamData.find(team => team.code === md.away_team);

        if (!homeTeam || !awayTeam) {
            throw new Error(
                `A team was not found: home-team: ${md.home_team} away-team: ${md.away_team}.`
            );
        }

        const mapped = {
            matchKey: `match:${md.date}:${homeTeam.code}:${awayTeam.code}`.replaceAll('/', '-'),
            available: true,
            awayTeam: awayTeam?.id,
            homeTeam: homeTeam?.id,
            date: md.date,
            time: md.time,
            location: md.location,
            ticketPrice: 2000,
            claimedUserId: null as null | number,
            qtyTicketsAvailable: 1,
            matchType: md.match_type || 'MLS'
        };
        return mapped;
    }) as InsertMatch[];

    return await db.insert(matchTable).values(mappedData).returning();
};

const generateRedemptionCodes = async () => {
    const codes = ['ebfgstid', 'lfgstid', 'toughkids'].map(item => ({ code: item }));
    return await db.insert(redemptionCodeTable).values(codes).returning();
};

async function main() {
    await cleanDb(tables);
    const teamData = (await readTeamData()) as TeamDataFromCSV[];
    const matchData = (await readMatchData()) as MatchDataFromCSV[];

    const teams = await generateTeams(teamData);
    const matches = await generateMatches(teams, matchData);

    console.log(teams);
    console.log(matches);
}

main();
