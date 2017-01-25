import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class NavBar extends Component {
  render() {
    return (
      <div>
        <h1>Season Ticket Tracker</h1>
        <h3>Seattle Sounders 2017 Season</h3>

        { this.props.user.user ?
          <h3>[[Display Name Here]]</h3> :
          <Link to="/login" > Login </ Link>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const NavBarContainer = connect(mapStateToProps)(NavBar)

export default NavBarContainer
