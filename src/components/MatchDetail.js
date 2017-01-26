import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateMatchReq, selectMatch } from '../actions/matches-actions'
import { userLoginReq } from '../actions/user-actions'
import NavBar from './NavBar'
import '../styles/MatchDetail.css'

class MatchDetail extends Component {
  constructor(props) {
    super(props)

    this.ticketAvailable = this.ticketAvailable.bind(this)
    this.renderMatchDetails = this.renderMatchDetails.bind(this)
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

  renderMatchDetails(match) {
    return (
      <div className='match-detail-item'>
        <h1 className='match-detail-title'>{ match.homeTeam.name } vs. { match.awayTeam.name }</h1>
        <h3 className='center-text match-detail-subtitle medium-grey-text'> There is {match.qtyTicketsAvailable} ticket available for this match.</h3>
        <div className="center-button">
          <button className="action-button claim-ticket-button" onClick={(e) => this.props.claimTicket(this.props.params.matchId)}>Claim Ticket</button>
        </div>

        <div className='match-detail-group'>
          <div className='match-detail-item half-width'>
            <h4 className='match-detail-text medium-grey-text'>{ match.date } - { match.time }</h4>
            <h4 className='match-detail-text medium-grey-text'>{ match.location }</h4>
            <h4 className='match-detail-text medium-grey-text'>${ ( match.ticketPrice / 100 ).toFixed(2)} each</h4>
          </div>

          {/* TODO -- need to create CSS that sets flex-direction: row-reverse on small screens  */}

          <div className='match-detail-item half-width'>
            <img className='away-team-img' src={match.awayTeam.img} alt={match.awayTeam.name}/>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { match } = this.props
    return (
      <div>
        <NavBar />
        <div className='match-detail-container'>
          { match ? this.renderMatchDetails(match) : '' }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('the state', state)
  return {
    match: state.matches.data[state.matches.selectedMatch],
    user: state.user.user,
    credential: state.user.credential
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    claimTicket: (matchId, userId) => {
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
