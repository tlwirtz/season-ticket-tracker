import React, { Component } from 'react'
import base from '../base'

class MatchDetail extends Component {
  constructor(props) {
    super(props)

    this.state = { }
    this.ref = base.syncState('matches', {
      context: this,
      state: 'matches'
    })

    this.findMatch = this.findMatch.bind(this)
    this.claimTicket = this.claimTicket.bind(this)
    this.ticketAvailable = this.ticketAvailable.bind(this)
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  findMatch(matchId) {
    console.log(matchId)
      if (this.state.matches) {
        const filteredMatches = Object.keys(this.state.matches).filter(key => key === matchId)
        return this.state.matches[filteredMatches]
      }
  }

  claimTicket(e, matchId) {
    e.preventDefault();
    const { matches } = this.state
    if (this.ticketAvailable(matches[matchId])) {
      matches[matchId].claimedUserId = this.state.user.uid
      matches[matchId].available = false
      return this.setState({ matches })
    }
  }

  ticketAvailable(match) {
    if (match.claimedUser || !match.available) return false
    return true
  }

  render() {
    const match = this.findMatch(this.props.params.matchId)
    return (
      <div>
        <h1>{ match ? match.homeTeam.name : '' }</h1>
        <button onClick={(e) => this.claimTicket(e, this.props.params.matchId)}>Claim Ticket</button>
      </div>
    )
  }
}

export default MatchDetail
