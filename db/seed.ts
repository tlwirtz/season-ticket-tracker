import {
    InsertAdmin,
    InsertAppAlert,
    InsertMatch,
    InsertRedemptionCode,
    InsertTeam,
    SelectTeam,
    adminTable,
    appAlertTable,
    matchTable,
    matchTypeEnum,
    redemptionCodeTable,
    teamTable
} from './schema';
import { db } from './db';
import { faker } from '@faker-js/faker';

const cleanDb = async (tableList: typeof tables) => {
    const deletePromises = tableList.map(t => db.delete(t));
    await Promise.all(deletePromises);
};

const generateTeams = async (numOfTeams: number) => {
    const createRandomTeam = (): InsertTeam => {
        return {
            name: faker.string.alpha(10),
            img: faker.image.urlLoremFlickr({ category: 'sports' })
        };
    };

    const teams = faker.helpers.multiple(createRandomTeam, { count: numOfTeams });
    return await db.insert(teamTable).values(teams).returning();
};

const generateMatches = async (numOfMatches: number, teams: SelectTeam[]) => {
    const [fakeSounder, ...oppositionTeams] = teams;

    const createRandomMatch =
        (homeTeam: typeof fakeSounder, otherTeams: typeof oppositionTeams) => (): InsertMatch => {
            const tickets = faker.number.int({ min: 0, max: 3 });
            return {
                matchKey: `match-${faker.number.int(2)}-${faker.number.int(2)}-${faker.number.int({
                    min: 24,
                    max: 25
                })}`,
                available: tickets > 0,
                awayTeam: faker.helpers.arrayElement(otherTeams.map(op => op.id)),
                homeTeam: homeTeam.id,
                date: faker.date.soon({ days: 365 }).toLocaleDateString(),
                location: faker.location.city(),
                matchType: matchTypeEnum.enumValues[0], //MLS
                qtyTicketsAvailable: tickets,
                time: faker.date.soon({ days: 365 }).toLocaleTimeString(),
                ticketPrice: faker.number.int({ min: 2200, max: 5500 }),
                timestamp: faker.date.soon({ days: 365 }),
                claimedUserId: tickets > 0 ? null : faker.internet.userName()
            };
        };

    const matches = faker.helpers.multiple(createRandomMatch(fakeSounder, oppositionTeams), {
        count: numOfMatches
    });

    return await db.insert(matchTable).values(matches).returning();
};

async function main() {
    const tables = [redemptionCodeTable, matchTable, appAlertTable, adminTable, teamTable];

    await cleanDb(tables);
    const teams = await generateTeams(30);
    const matches = await generateMatches(30, teams);

    console.log(teams);
    console.log(matches);
}

main();
