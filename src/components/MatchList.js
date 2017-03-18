import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { selectMatch } from '../actions/matches-actions';

import Match from './Match';

export class MatchList extends Component {
  constructor(props) {
    super(props)
    this.buildMatch = this.buildMatch.bind(this)
    this.filterMatch = this.filterMatch.bind(this)
  }

  filterMatch(isAvailable) {
    return (key) => this.props.matches[key].available === isAvailable
  }

  buildMatch(key) {
    const bg = this.props.matches[key].awayTeam.img;
    return (
      <Link
        key={key} to={`/matches/${key}`}
        className='match animated fadeInUp'
        style={{ backgroundImage: `url(${bg})` }}
        onClick={() => this.props.onMatchClick(key)} >
        <Match
          matchData={this.props.matches[key]}
          {...this.props} />
      </Link>
    );
  }

  render() {
    const availableGames = Object.keys(this.props.matches)
      .filter(this.filterMatch(true))
      .map(this.buildMatch);

    const reservedGames = Object.keys(this.props.matches)
      .filter(this.filterMatch(false))
      .map(this.buildMatch);

    return (
      <section>
        <div className='match-container'>
          <h3 className="extra-left-margin nav-bar-subheading soft-grey-text" >Available matches</h3>
        </div>
        <div className='match-container'>
          {availableGames}
        </div>
        <div className='match-container'>
          <h3 className="extra-left-margin nav-bar-subheading soft-grey-text" >Unavailable Matches</h3>
        </div>
        <div className='match-container'>
          {reservedGames}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    matches: state.matches.data,
    user: state.user,
    alert: state.alert.visible
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMatchClick: (matchId) => {
      dispatch(selectMatch(matchId));
    }
  };
};

const MatchListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchList);

export default MatchListContainer;
