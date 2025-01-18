'use client';

import { useState } from 'react';
import '../../styles/RedeemMatch.css';
import '../../styles/NavBar.css';
import { validateAndClaimTicket } from '@/actions/redeemMatch';

export default function RedeemMatch({ matchId }) {
    const [redemptionCode, setRedemptionCode] = useState('');
    const [redemptionMessage, setRedemptionMessage] = useState('');

    async function claimTicket(matchId, redemptionCode) {
        const result = await validateAndClaimTicket({
            matchId,
            redemptionCode
        });

        if (result) {
            setRedemptionMessage(result.message);
        }
    }

    function validateState() {
        return redemptionCode === '';
    }

    function handleChange(e) {
        setRedemptionCode(e.target.value);

        //reset message when user types new code
        if (redemptionMessage) {
            setRedemptionMessage(null);
        }
    }

    function handleClaimTicket(e) {
        e.preventDefault();
        return claimTicket(matchId, redemptionCode);
    }

    return (
        <div>
            {redemptionMessage && <p>{redemptionMessage}</p>}
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
