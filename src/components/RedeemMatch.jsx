import React, { Component } from 'react';
import * as T from 'prop-types';
import { connect } from 'react-redux';
import { updateMatchReq } from '../actions/matches-actions';
import '../styles/RedeemMatch.css';

//todo -- convert me
export class RedeemMatch extends Component {
    constructor(props) {
        super(props);

        this.state = { redemptionCode: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleClaimTicket = this.handleClaimTicket.bind(this);
        this.validateState = this.validateState.bind(this);
    }

    validateState() {
        return this.state.redemptionCode === '';
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleClaimTicket(e) {
        e.preventDefault();
        const { user, matchId } = this.props;
        const { redemptionCode } = this.state;
        const { displayName, uid, email } = user;

        if (user.uid) {
            return this.props.claimTicket(matchId, { displayName, uid, email }, redemptionCode);
        }

        return false;
    }

    render() {
        return (
            <div>
                <button
                    className="action-button claim-ticket-button"
                    onClick={e => this.handleClaimTicket(e)}
                    disabled={this.validateState()}
                >
                    Claim Ticket
                </button>
                <input
                    className="redemption-input"
                    type="text"
                    name="redemptionCode"
                    value={this.state.redemptionCode}
                    placeholder="Redemption Code"
                    onChange={e => this.handleChange(e)}
                />
            </div>
        );
    }
}

RedeemMatch.propTypes = {
    claimTicket: T.func.isRequired,
    user: T.object,
    match: T.object
};

const mapDispatchToProps = dispatch => {
    return {
        claimTicket: (matchId, user, redemptionCode) => {
            const payload = { claimedUser: user, available: false };
            dispatch(updateMatchReq(matchId, payload, redemptionCode));
        }
    };
};

const RedeemMatchContainer = connect(null, mapDispatchToProps)(RedeemMatch);

export default RedeemMatchContainer;
