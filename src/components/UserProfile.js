import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { Link } from 'react-router'
import Match from './Match'
import NotLoggedIn from './NotLoggedIn'

class UserProfile extends Component {
  constructor(props) {
    super(props)

    this.renderLoggedIn = this.renderLoggedIn.bind(this)
    this.renderNotLoggedIn = this.renderNotLoggedIn.bind(this)
  }

  renderLoggedIn() {
    return (
      <div>
        <h2 className="animated fadeInUp">Your Matches</h2>
        <ul>
          {
            this.props.userMatches.length > 0

            ? this.props.userMatches.map(match =>
              <li key={match.id} className="animated fadeInUp">
                <Match key={match.id} matchData={match} condensed/>
              </li> )
            : (
              <div className="animated fadeInUp">
                <h2 className="medium-grey-text"> You are not going to any matches</h2>
                <h2 className="medium-grey-text"> Find some <Link className="soft-grey-text" to="/">here</Link></h2>
              </div>
            )
          }
        </ul>
      </div>
    )
  }

  renderNotLoggedIn() {
    return (
      <NotLoggedIn />
    )
  }

  render() {
    return (
        <div className="match-detail-container">
          <div className="match-detail-item">
            {
              this.props.user
              ? this.renderLoggedIn()
              : this.renderNotLoggedIn()
            }
          </div>
        </div>
    )
  }
}

const filterUserMatches = (match, userid) => match.claimedUserId === userid
const reduceMatches = (matches) => (a, b) => a.concat([matches[b]])
const matchReducer = matches => reduceMatches(matches.data)
const computeUserMatches = (user, matches) => {
  return Object
    .keys(matches.data)
    .reduce(matchReducer(matches), [])
    .filter((match) => filterUserMatches(match, user.uid))
}


const mapStateToProps = (state) => {
  const { matches } = state
  const user = _.isEmpty(state.user) ? null : state.user.user

  return {
    userMatches: user ? computeUserMatches(user, matches) : null,
    user
  }
}

const UserProfileContainer = connect(mapStateToProps)(UserProfile)

export default UserProfileContainer;
