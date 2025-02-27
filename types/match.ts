import { MatchWithTeams } from '../db/schema';
import { User } from '@clerk/nextjs/server';
export interface Team {
    id: number;
    name: string;
    logoUrl: string | null;
}

export interface Match {
    id: number;
    homeTeam: Team;
    awayTeam: Team;
    dateTime: Date | null;
    venue: string | null;
    city: string;
    ticketPrice: number;
    isUserAttending: boolean;
    userEmail?: string;
}

export interface TicketTier {
    id: string;
    name: string;
    price: number;
    availableCount: number;
}

export type RedeemedMatch = MatchWithTeams & { user: User };
