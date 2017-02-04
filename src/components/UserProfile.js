import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar'
import Match from './Match'

class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="match-detail-container">
          <div className="match-detail-item">
            <h2 className="animated fadeInUp">Your Matches</h2>

            <ul>
              {
                this.props.userMatches.map(match =>
                  <li key={match.id} className="animated fadeInUp">
                    <Match key={match.id} matchData={match} condensed/>
                  </li> )
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const filterUserMatches = (match, userid) => match.claimedUserId === userid
const reduceMatches = (matches) => (a, b) => a.concat([matches[b]])

const mapStateToProps = (state) => {
  //TODO -- this should go into a selector
  const { matches } = state
  const { user } = state.user
  const matchReducer = reduceMatches(matches.data)
  const filteredMatches = Object.keys(matches.data).reduce(matchReducer, []).filter((match) => filterUserMatches(match, user.uid))

  return {
    userMatches: filteredMatches
  }
}

const UserProfileContainer = connect(mapStateToProps)(UserProfile)

export default UserProfileContainer;
