import moment from 'moment';
import React, { Component, PropTypes as T } from 'react';
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

  isAfter(time) { return moment(time).isAfter(moment()) }
  isBefore(time) { return moment(time).isBefore(moment()) }
  
  filterMatch(test) {
    const { matches } = this.props
    return (key) => {
      const { available, timestamp } = matches[key]
      if (test) {
        return available === test && this.isAfter(timestamp)
      } 

      return available === test || this.isBefore(timestamp)
    }
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

MatchList.propTypes = {
  matches: T.object.isRequired,
  onMatchClick: T.func.isRequired,
}

const mapStateToProps = (state) => {
  return { matches: state.matches.data, };
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
