import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames'
import '../styles/Alert.css'

import {
  SHOW_ALERT,
  HIDE_ALERT,
  updateAlert }
  from '../actions/alert-actions'

class Alert extends Component {
  constructor(props) {
    super(props)

    this.sendUpdate = this.sendUpdate.bind(this)
  }

  sendUpdate() {
    const payload = { type: HIDE_ALERT, visible: false }
    return this.props.updateAlert(payload)
  }

  render() {
    const alertClasses = classNames({
      normal: this.props.status === 'normal',
      error: this.props.status === 'error',
      success: this.props.status === 'success',
      warning: this.props.status === 'warning',
      'alert-item': true
    })

    return (
      <div className='alert-container' onClick={() => {this.sendUpdate()}} >
        <div className={alertClasses}>
          <p>{this.props.msg}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.alert.status,
    msg: state.alert.msg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAlert: (payload = {}) => dispatch(updateAlert(payload))
  }
}

const AlertContainer = connect(mapStateToProps, mapDispatchToProps)(Alert)

export default AlertContainer;
