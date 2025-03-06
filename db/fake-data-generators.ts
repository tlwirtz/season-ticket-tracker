import { faker } from '@faker-js/faker';
import {
    InsertTeam,
    InsertMatch,
    InsertAdmin,
    InsertRedemptionCode,
    InsertStripeEvent,
    SelectTeam,
    matchTypeEnum
} from './schema';

export const generateFakeTeams = (numOfTeams: number): InsertTeam[] => {
    const createRandomTeam = (): InsertTeam => {
        return {
            name: faker.company.name(),
            img: faker.image.urlLoremFlickr({ category: 'sports' })
        };
    };

    return faker.helpers.multiple(createRandomTeam, { count: numOfTeams });
};

export const generateFakeMatches = (
    numOfMatches: number,
    teams: SelectTeam[],
    minTicketCount = 0,
    maxTicketCount = 3
): InsertMatch[] => {
    const [fakeSounder, ...oppositionTeams] = teams;

    const createRandomMatch =
        (homeTeam: typeof fakeSounder, otherTeams: typeof oppositionTeams) => (): InsertMatch => {
            const tickets = faker.number.int({ min: minTicketCount, max: maxTicketCount });
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

    return faker.helpers.multiple(createRandomMatch(fakeSounder, oppositionTeams), {
        count: numOfMatches
    });
};

export const generateFakeAdmins = (numOfAdmins: number): InsertAdmin[] => {
    const createRandomAdmin = (): InsertAdmin => ({
        email: faker.internet.email(),
        externalUid: `user_${faker.string.nanoid()}`
    });

    return faker.helpers.multiple(createRandomAdmin, { count: numOfAdmins });
};

export const generateFakeRedemptionCodes = (numOfCodes: number): InsertRedemptionCode[] => {
    const createRandomRedemptionCode = (): InsertRedemptionCode => ({
        code: faker.string.nanoid()
    });

    const codes = faker.helpers.multiple(createRandomRedemptionCode, { count: numOfCodes });
    codes.push({ code: 'stripe_redemption' });

    return codes;
};

export const generateFakeStripeEvents = (numOfEvents: number): InsertStripeEvent[] => {
    const createRandomStripeEvent = (): InsertStripeEvent => ({
        eventId: faker.string.nanoid(),
        objectId: faker.string.nanoid(),
        eventType: faker.helpers.arrayElement(['session.checkout.completed']),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        processedOk: faker.datatype.boolean(),
        eventBody: faker.helpers.objectValue({
            key: faker.string.nanoid(),
            value: faker.lorem.sentence()
        })
    });

    return faker.helpers.multiple(createRandomStripeEvent, { count: numOfEvents });
};
