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
}
