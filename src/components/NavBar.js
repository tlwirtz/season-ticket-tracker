import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import '../styles/NavBar.css'
import '../styles/Colors.css'

class NavBar extends Component {
  render() {
    return (
      <div className="nav-bar-container">
        <div className="nav-bar-item nav-bar-heading">
          <h1 className="nav-bar-title">Match Finder</h1>
          <h3 className="nav-bar-subheading soft-grey-text">Seattle Sounders 2017 Season</h3>
        </div>

        { this.props.user.user ?
          <h3 className="nav-bar-item" >[[Display Name Here]]</h3> :
          <Link to="/login"  className="nav-bar-item" > Login </ Link>
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
