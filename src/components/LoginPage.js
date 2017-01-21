import React, { Component } from 'react'
import { connect } from 'react-redux'
import { userLogoutReq, userLoginReq } from '../actions/user-actions'

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
      <div>
        <button onClick={(e) => this.handleSignIn(e, 'github')} >Login with Github</button>
        <button onClick={(e) => this.handleSignIn(e, 'facebook')} >Login with Facebook</button>
        <button onClick={(e) => this.handleSignIn(e, 'google')} >Login with Google</button>
        <button onClick={(e) => this.handleSignIn(e, 'twitter')} >Login with Twitter</button>

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
