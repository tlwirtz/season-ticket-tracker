'use client';

import { useState } from 'react';
import '../../styles/RedeemMatch.css';
import '../../styles/NavBar.css';
import { validateRedemptionCode } from '@/actions/redeemMatch';

export default function RedeemMatch({ user, matchId }) {
    const [redemptionCode, setRedemptionCode] = useState('');

    /**
     * TODO -- need to figure out how to get the updated match
     * TODO -- object back to the frontend.
     * TODO -- having a hard time figuring out what the correct "Next.JS" way to do this.\
     * TODO -- probably have to do something with 'useEffect' but I'm essentially
     * TODO -- updating props...
     * TODO -- this tutorial has us redirect from inside of the server action
     * TODO -- https://nextjs.org/learn/dashboard-app/mutating-data
     */
    async function claimTicket(matchId, user, redemptionCode) {
        const payload = { claimedUser: user, available: false };
        console.log('claiming ticket', payload);

        await validateRedemptionCode({
            matchId,
            claimedUser: user,
            redemptionCode,
            available: false
        });
    }

    function validateState() {
        return redemptionCode === '';
    }

    function handleChange(e) {
        setRedemptionCode(e.target.value);
    }

    function handleClaimTicket(e) {
        e.preventDefault();
        const { displayName, uid, email } = user;

        if (user.uid) {
            return claimTicket(matchId, { displayName, uid, email }, redemptionCode);
        }

        return false;
    }

    return (
        <div>
            <button
                className="action-button claim-ticket-button"
                onClick={e => handleClaimTicket(e)}
                disabled={validateState()}
            >
                Claim Ticket
            </button>
            <input
                className="redemption-input"
                type="text"
                name="redemptionCode"
                value={redemptionCode}
                placeholder="Redemption Code"
                onChange={e => handleChange(e)}
            />
        </div>
    );
}
