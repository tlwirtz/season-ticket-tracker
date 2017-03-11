import React, { Component } from 'react';

class NotLoggedIn extends Component {
  render() {
    return (
      <div >
        <h1 className="match-detail-title"> Oh no! You're not logged in.</h1>
        <h3 className="medium-grey-text centered">You need to be logged in to see this page</h3>
      </div>
    );
  }
}

export default NotLoggedIn;
