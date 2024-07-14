import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateMatchReq } from '../actions/matches-actions';
import '../styles/RedeemMatch.css';

export default function RedeemMatch({ user, matchId }) {
    const dispatch = useDispatch();
    const [redemptionCode, setRedemptionCode] = useState('');

    function claimTicket(matchId, user, redemptionCode) {
        const payload = { claimedUser: user, available: false };
        dispatch(updateMatchReq(matchId, payload, redemptionCode));
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
