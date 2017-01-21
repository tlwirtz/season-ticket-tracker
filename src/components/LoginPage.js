import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogoutReq, userLoginReq } from '../actions/user-actions'
import _ from 'lodash'
import '../styles/LoginPage.css'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.renderLogout = this.renderLogout.bind(this)
  }

  componetWillMount() {
    console.log('rendering log-in', this.props)
  }

  handleSignIn(e, provider) {
    e.preventDefault();
    return this.props.login(provider)
  }

  handleSignOut(e) {
    e.preventDefault();
    return this.props.logout();
  }

  renderLogout() {
    return (
      <div>
        <h1>You are already logged in</h1>
        <button onClick={(e) => this.handleSignOut(e)}>Logout</button>
      </div>
    )
  }

  renderLogin() {
    return (
      <div className="login-container">
        <button
          className='login-button github'
          onClick={(e) => this.handleSignIn(e, 'github')} >
          <h3>Github</h3>
        </button>
        <button
          className='login-button facebook'
          onClick={(e) => this.handleSignIn(e, 'facebook')} >
          <h3>Facebook</h3>
        </button>
        <button
          className='login-button google'
          onClick={(e) => this.handleSignIn(e, 'google')} >
          <h3>Google</h3>
        </button>
        <button
          className='login-button twitter'
          onClick={(e) => this.handleSignIn(e, 'twitter')} >
          <h3>Twitter</h3>
        </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        {
          !this.props.user ? this.renderLogin() : this.renderLogout()
        }
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: _.isEmpty(state.user) ? null : state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (provider) => {
      dispatch(userLoginReq(provider))
    },
    logout: () => {
      dispatch(userLogoutReq())
    }
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default LoginContainer;
