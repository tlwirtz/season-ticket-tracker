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
    teamTable,
    ticketRedemptionTable
} from './schema';
import { db } from './db';
import { faker } from '@faker-js/faker';

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

const generateTeams = async (numOfTeams: number) => {
    const createRandomTeam = (): InsertTeam => {
        return {
            name: faker.company.name(),
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

const generateAdmins = async (numOfAdmins: number) => {
    const createRandomAdmin = () => ({
        email: faker.internet.email(),
        externalUid: `user_${faker.string.nanoid()}`
    });

    const admins = faker.helpers.multiple(createRandomAdmin, { count: numOfAdmins });
    return await db.insert(adminTable).values(admins).returning();
};

const generateRedemptionCodes = async (numOfCodes: number) => {
    const createRandomRedemptionCode = () => ({
        code: faker.string.nanoid()
    });

    const codes = faker.helpers.multiple(createRandomRedemptionCode, { count: numOfCodes });
    return await db.insert(redemptionCodeTable).values(codes).returning();
};

async function main() {
    await cleanDb(tables);
    const teams = await generateTeams(30);
    const matches = await generateMatches(30, teams);
    const admins = await generateAdmins(2);
    const codes = await generateRedemptionCodes(2);

    console.log(teams);
    console.log(matches);
    console.log(admins);
    console.log(codes);
}

main();
