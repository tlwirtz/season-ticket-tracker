import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { userLogoutReq, checkIfAdmin } from '../actions/user-actions'
import '../styles/NavBar.css'
import '../styles/Colors.css'

class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.user) {
      checkIfAdmin(nextProps.user.user.uid)
      .then(result => this.setState({isAdmin: result}))
    }
  }

  render() {
    return (
      <div className="nav-bar-container">
        <div className="nav-bar-item nav-bar-heading">
          <Link to="/">
            <h1 className="nav-bar-title">Match Finder</h1>
          </Link>
          <h3 className="nav-bar-subheading soft-grey-text">Seattle Sounders 2017 Season</h3>
        </div>

        { this.props.user.user ?
        <div className="nav-bar-group">
          <div className="nav-bar-item">
            <Link to="/">
              <div className="nav-link">Home</div>
            </Link>
          </div>
          <div className="nav-bar-item">
            <Link to="/profile">
            <div className="nav-link">My Matches</div>
          </Link>
        </div>
          { this.state.isAdmin
            ? <div className="nav-bar-item">
                <Link to="/profile">
                  <div className="nav-link">Admin</div>
                </Link>
              </div>
            : null
          }
          <div className="nav-bar-item">
            <img alt="user-logo" className="nav-bar-user-logo" src={this.props.user.user.photoURL} />
          </div>
          <div className="nav-bar-item">
            <button className="action-button" onClick={(e) => {this.props.logout(e)}} > Logout</button>
          </div>
        </div>
          :
          <div className="nav-bar-group">
            <Link to="/login"  className="nav-bar-item" >
            <button className="action-button">Login</button>
          </ Link>
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (e) => {
      e.preventDefault();
      return dispatch(userLogoutReq())
    }
  }
}

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

export default NavBarContainer
