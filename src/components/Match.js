import React, { Component } from 'react';
import '../styles/Match.css';
import logo from '../imgs/logo.svg';


class Match extends Component {
  render() {
    return (
      <div className="match-container">
        <img src={logo} className="match-logo" alt="logo" />
        <div>
          <h1>Seattle Sounders vs Portland Timbers</h1>
          <h2>JULY 01 2017 | 1:00PM | MLS | $25.00</h2>
        </div>
      </div>
    )
  }
}

export default Match
