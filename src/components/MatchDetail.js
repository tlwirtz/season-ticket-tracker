import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateMatchReq, selectMatch } from '../actions/matches-actions'
import base from '../base'

class MatchDetail extends Component {
  constructor(props) {
    super(props)

    this.ticketAvailable = this.ticketAvailable.bind(this)
  }

  componentWillMount() {
    this.props.selectMatch(this.props.params.matchId)
  }

  componentWillUnmount() {
    this.props.selectMatch(null)
  }

  ticketAvailable(match) {
    if (match.claimedUser || !match.available) return false
    return true
  }

  render() {
    const { match } = this.props
    return (
      <div>
        <h1>{ match ? match.homeTeam.name : '' }</h1>
        <button onClick={(e) => this.props.claimTicket(this.props.params.matchId)}>Claim Ticket</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    match: state.matches.data[state.matches.selectedMatch],
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    claimTicket: (matchId, userId='xxx') => {
      dispatch(updateMatchReq(matchId, {
        claimedUserId: userId,
        available: false
      }))
    },
    selectMatch: (matchId) => {
      dispatch(selectMatch(matchId))
    }
  }
}

const MatchDetailContainer = connect(mapStateToProps, mapDispatchToProps)(MatchDetail)
export default MatchDetailContainer
