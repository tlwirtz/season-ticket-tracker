import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkIfAdmin } from '../actions/user-actions';
import Match from './Match';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = { };
    this.renderAdmin = this.renderAdmin.bind(this);
    this.renderNotAdmin = this.renderNotAdmin.bind(this);
    this.checkAdmin = this.checkAdmin.bind(this);
  }

  componentWillMount() {
    const { user } = this.props;
    if (user)  return this.checkAdmin(user.uid);
    return this.setState({isAdmin: false});
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user) return this.checkAdmin(user.uid);
    return this.setState({isAdmin: false});
  }

  checkAdmin(userid) {
    checkIfAdmin(userid)
    .then(result => this.setState({isAdmin: result}));
  }

  renderAdmin() {
    return (
      <div>
        <h2 className="animated fadeInUp">ClaimedMatches
          <ul>
            {
              this.props.claimedMatches.length > 0
              ? this.props.claimedMatches.map( match =>
                <li key={match.id} className="animated fadeInUp">
                  <Match key={match.id} matchData={match} condensed />
                </li> )
              : (
                <div className="animated fadeInUp">
                  <h2 className="medium-grey-text">No Matches Claimed at this Time</h2>
                </div>
              )
            }
          </ul>
        </h2>
      </div>
    );
  }

  renderNotAdmin() {
    return (
      <div >
        <h1 className="match-detail-title"> Oh no! You don't have access to this page.</h1>
      </div>
    );
  }

  render() {
    return (
      <div className="match-detail-container">
        <div className="match-detail-item">
          {
            this.state.isAdmin
            ? this.renderAdmin()
            : this.renderNotAdmin()
          }
        </div>
      </div>
    );
  }
}

const reduceMatches = (matches) => (a, b) => a.concat([matches[b]]);
const matchReducer = matches => reduceMatches(matches.data);

const claimedMatches = (matches) => {
  return Object
    .keys(matches.data)
    .reduce(matchReducer(matches), [])
    .filter((match) => !match.available && match.claimedUserId);
};

const mapStateToProps = (state) => {
  const { matches } = state;
  const user = _.isEmpty(state.user) ? null : state.user.user;

  return {
    user,
    claimedMatches: matches ? claimedMatches(matches) : null,
  };
};

const AdminContainer = connect(mapStateToProps)(Admin);

export default AdminContainer;
