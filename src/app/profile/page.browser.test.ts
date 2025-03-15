import '@vitest/browser/matchers.d.ts';

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import Profile from './page';
import { currentUser, User } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '../../../db/db';
import {
    matchTable,
    redemptionCodeTable,
    teamTable,
    ticketRedemptionTable
} from '../../../db/schema';
import {
    generateFakeMatches,
    generateFakeTeams,
    generateFakeTicketRedemptions
} from '../../../db/fake-data-generators';

//helper to build a fake match and then redeem a ticket for it.
async function setupFakeRedemption(userId: string) {
    const [fakeRedemptionCode] = await db.select().from(redemptionCodeTable).limit(1);
    const fakeTeams = await db.insert(teamTable).values(generateFakeTeams(2)).returning();
    const [fakeMatch] = await db
        .insert(matchTable)
        .values(generateFakeMatches(2, fakeTeams, 1, 1))
        .returning();

    const [fakeRedemption] = await db
        .insert(ticketRedemptionTable)
        .values(generateFakeTicketRedemptions(1, fakeMatch, fakeRedemptionCode, userId))
        .returning();

    return {
        teams: fakeTeams,
        match: fakeMatch,
        redemption: fakeRedemption,
        code: fakeRedemptionCode
    };
}

// Mock dependencies
vi.mock('@clerk/nextjs/server', () => ({
    currentUser: vi.fn()
}));

vi.mock('next/navigation', () => ({
    redirect: vi.fn()
}));

describe('Profile Page', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('redirects to sign-in when no user', async () => {
        vi.mocked(currentUser).mockResolvedValueOnce(null);

        await Profile();

        expect(redirect).toHaveBeenCalledWith('/sign-in');
    });

    it('shows empty state when user has no matches', async () => {
        const mockUser = { id: 'user-1' };
        vi.mocked(currentUser).mockResolvedValueOnce(mockUser as User);

        render(await Profile());

        expect(screen.getByText('You are not going to any matches')).toHaveTextContent(
            'You are not going to any matches'
        );
        expect(screen.getByText('Find some')).toHaveTextContent('Find some');
    });

    it('shows match grid when user has matches', async () => {
        //todo -- need to setup test users and data
        const mockUser = { id: 'user-1' };
        vi.mocked(currentUser).mockResolvedValueOnce(mockUser as User);

        //setup a fake match and then redeem a ticket for it.
        await setupFakeRedemption(mockUser.id);

        render(await Profile());
        expect(screen.getByTestId('match-grid')).toBeInTheDocument();
    });

    it('makes correct database query', async () => {
        const mockUser = { id: 'user-1' };
        vi.mocked(currentUser).mockResolvedValueOnce(mockUser as User);

        //setup a fake match and then redeem a ticket for it.
        await setupFakeRedemption(mockUser.id);

        render(await Profile());

        expect(screen.queryAllByTestId('match-card', { exact: false }).length).toBe(1);
    });
});
