import React, { Component } from 'react';
import { Link } from 'react-router'

class NotLoggedIn extends Component {
  render() {
    return (
      <div>
        <h1> Oh no! You're not logged in.</h1>
        <Link to="/login"> Login </Link>
      </div>
    )
  }
}

export default NotLoggedIn;
