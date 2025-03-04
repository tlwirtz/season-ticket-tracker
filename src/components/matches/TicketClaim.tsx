'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { TicketTier } from '../../../types/match';
import { validateAndClaimTicket } from '@/actions/redeemMatch';
import StripeCheckout from './StripeClaim';

interface TicketClaimProps {
    matchId: number;
    ticketTiers: TicketTier[];
    isLoggedIn: boolean;
}

export function TicketClaim({ matchId, ticketTiers, isLoggedIn }: TicketClaimProps) {
    const useStripeCheckout = process.env.NEXT_PUBLIC_USE_STRIPE === 'true';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [redemptionCode, setRedemptionCode] = useState('');
    const [redemptionMessage, setRedemptionMessage] = useState('');

    async function claimTicket(matchId: number, redemptionCode: string) {
        setIsSubmitting(true);

        const result = await validateAndClaimTicket({
            matchId,
            redemptionCode
        });

        setIsSubmitting(false);

        if (result) {
            setRedemptionMessage(result.message);
        }
    }

    function validateState() {
        return redemptionCode === '';
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setRedemptionCode(e.target.value);

        //reset message when user types new code
        if (redemptionMessage) {
            setRedemptionMessage('');
        }
    }

    function handleClaimTicket(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        return claimTicket(matchId, redemptionCode);
    }

    function anyTicketsAvailable(tiers: TicketTier[]) {
        return tiers.some(tt => tt.availableCount > 0);
    }

    function generateClaimForm() {
        if (!isLoggedIn) {
            return (
                <div className="text-sm font-medium text-gray-900">
                    Log-in or Sign-up to claim tickets!
                </div>
            );
        }

        if (useStripeCheckout) {
            return <></>;
        }

        return anyTicketsAvailable(ticketTiers) ? (
            <form onSubmit={e => handleClaimTicket(e)} className="space-y-6">
                <div>
                    <label
                        htmlFor="claimCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Enter Claim Code
                    </label>
                    {redemptionMessage.length > 0 && (
                        <div className="text-red-500 text-sm font-medium leading-6">
                            {redemptionMessage}
                        </div>
                    )}
                    <div className="mt-2">
                        <input
                            id="claimCode"
                            type="text"
                            value={redemptionCode}
                            onChange={e => handleChange(e)}
                            className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-purple-600 focus:border focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Enter your code here"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-md bg-purple-600 px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Claiming...' : 'Claim Ticket'}
                </button>
            </form>
        ) : (
            <div className="text-sm font-medium text-gray-900">
                Sorry, there are no tickets available for this match.
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
            <div className={`${useStripeCheckout ? '' : 'border-b'} border-gray-200 p-8`}>
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                    Available Tickets
                </h3>
                {useStripeCheckout && isLoggedIn && anyTicketsAvailable(ticketTiers) ? (
                    <StripeCheckout matchId={matchId} />
                ) : (
                    <div className="mt-6 flow-root">
                        <ul className="-my-2 divide-y divide-gray-100">
                            {ticketTiers.map(tier => (
                                <li
                                    key={tier.id}
                                    className="flex items-center justify-between py-2"
                                >
                                    <div className="flex items-center">
                                        <p className="text-sm font-medium text-gray-900">
                                            {tier.name}
                                        </p>
                                    </div>
                                    <div className="ml-4 flex flex-col items-center gap-y-2 sm:gap-x-4 sm:flex-row">
                                        <span className="text-sm font-medium text-gray-900">
                                            ${(tier.price / 100).toFixed(2)}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                            {tier.availableCount} available
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="p-8">{generateClaimForm()}</div>
        </div>
    );
}
