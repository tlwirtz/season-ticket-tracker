'use client';

import { useState } from 'react';
import '../../styles/RedeemMatch.css';
import '../../styles/NavBar.css';
import { validateAndClaimTicket } from '@/actions/redeemMatch';

export default function RedeemMatch({ matchId }) {
    const [redemptionCode, setRedemptionCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /**
     * TODO -- need to figure out how to get the updated match
     * TODO -- object back to the frontend.
     * TODO -- having a hard time figuring out what the correct "Next.JS" way to do this.\
     * TODO -- probably have to do something with 'useEffect' but I'm essentially
     * TODO -- updating props...
     * TODO -- this tutorial has us redirect from inside of the server action
     * TODO -- https://nextjs.org/learn/dashboard-app/mutating-data
     */
    async function claimTicket(matchId, redemptionCode) {
        const result = await validateAndClaimTicket({
            matchId,
            redemptionCode
        });

        if (result && !result.success) {
            setErrorMessage(result.message);
        }
    }

    function validateState() {
        return redemptionCode === '';
    }

    function handleChange(e) {
        setRedemptionCode(e.target.value);
    }

    function handleClaimTicket(e) {
        e.preventDefault();
        return claimTicket(matchId, redemptionCode);
    }

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
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
