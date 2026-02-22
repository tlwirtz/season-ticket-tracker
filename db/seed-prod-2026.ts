import { db } from './db';
import neatCSV from 'neat-csv';
import fs from 'fs';
import {
    InsertMatch,
    SelectTeam,
    matchTable,
    redemptionCodeTable,
    teamTable,
} from './schema';
import { parse } from 'date-fns';

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
    time_num: string;
    location: string;
    match_type: string;
};

const readTeamData = async () => {
    return await neatCSV(fs.createReadStream('mls-team-spreadsheet.csv'));
};

const readMatchData = async () => {
    return await neatCSV(fs.createReadStream('db/mls-team-matchups-2026.csv'));
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

const fetchTeams = async () => {
    return await db.select().from(teamTable);
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
            matchType: md.match_type || 'MLS',
            timestamp: parse(`${md.date} ${md.time_num}`, 'MM/dd/yyyy kk:mm', new Date())
        };
        return mapped;
    }) as InsertMatch[];

    return await db.insert(matchTable).values(mappedData).returning();
};

const generateRedemptionCodes = async () => {
    const codes = ['ebfgstid', 'lfgstid', 'toughkids', 'stripe_redemption'].map(item => ({
        code: item
    }));
    return await db.insert(redemptionCodeTable).values(codes).returning();
};

async function main() {
    const matchData = (await readMatchData()) as MatchDataFromCSV[];
    
    const teams = await fetchTeams();
    const matches = await generateMatches(teams, matchData);

    /** We don't need to reseed teams or redemption codes each year
     * But keeping this here for now in case we want to add new teams or codes in the future.
     */

    // const teams = await generateTeams(await readTeamData());
    // const redemptionCodes = await generateRedemptionCodes();

    console.log(teams);
    console.log(matches);
    // console.log(redemptionCodes);
}

main();
