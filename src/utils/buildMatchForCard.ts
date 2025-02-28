import { MatchWithTeams } from '../../db/schema';
import { User } from '@clerk/nextjs/server';
import { Match, RedeemedMatch } from '../../types/match';

export function buildMatch(match: MatchWithTeams | RedeemedMatch, user: User | null): Match {
    const { id, location, claimedUserId, timestamp, ticketPrice } = match.matches;
    const cardMatch: Match = {
        id,
        venue: location,
        city: 'Seattle, WA', //todo -- add to db
        dateTime: timestamp,
        ticketPrice,
        homeTeam: {
            id: match.homeTeam.id,
            name: match.homeTeam.name,
            logoUrl: match.homeTeam.img
        },
        awayTeam: {
            id: match.awayTeam.id,
            name: match.awayTeam.name,
            logoUrl: match.awayTeam.img
        },
        isUserAttending: Boolean(user?.id && claimedUserId && user?.id === claimedUserId)
    };

    //checks if type RedeemedMatch
    if ('user' in match) {
        cardMatch.userEmail = match.user.emailAddresses[0].emailAddress ?? null;
    }

    return cardMatch;
}
