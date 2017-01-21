import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogoutReq, userLoginReq } from '../actions/user-actions'
import '../styles/LoginPage.css'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.handleSignIn = this.handleSignIn.bind(this)
  }

  handleSignIn(e, provider) {
    e.preventDefault();
    return this.props.login(provider)
  }

  render() {
    return (
      <div className="login-container">
        <button className='login-button github' onClick={(e) => this.handleSignIn(e, 'github')} >Github</button>
        <button className='login-button facebook' onClick={(e) => this.handleSignIn(e, 'facebook')} >Facebook</button>
        <button className='login-button google' onClick={(e) => this.handleSignIn(e, 'google')} >Google</button>
        <button className='login-button twitter' onClick={(e) => this.handleSignIn(e, 'twitter')} >Twitter</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
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
