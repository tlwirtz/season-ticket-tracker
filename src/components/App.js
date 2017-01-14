import React, { Component } from 'react'
import Match from './Match'
import '../styles/App.css'
import logo from '../imgs/logo.svg';

//TODO -- this is a nice proof of concept.
//TODO -- need to hookup with multiple matches
//TODO -- sync to firebase
//TODO -- add authentication
class App extends Component {
  constructor(props) {
    super(props)
    this.claimTicket = this.claimTicket.bind(this)

    this.state = {
      matches: {
        'gameOne': {
          location:"CenturyLink Field",
          time:"1:00 PM",
          date:"July 01 2017",
          awayTeam:{
            name: "LA Galaxy",
            img: logo
          },
          homeTeam:{
            name: "Seattle Sounders",
            img: logo
          },
          matchType:"MLS",
          available: true,
          qtyTicketsAvailable: 1,
          ticketPrice:"2000",
          id:"diuf9ewfjw908e9f8wef",
          claimedUserId: null,
        }
      },
      user: {
        uid: 'djfkdjldfadflj'
      }
    }
  }

  claimTicket(e, matchId) {
    e.preventDefault();
    const { matches } = this.state
    if (!matches[matchId].claimedUserId) {
      matches[matchId].claimedUserId = this.state.user.uid
      this.setState({ matches })
    }
  }
  render() {

    return (
      <div>
      <Match key={this.state.matches.gameOne.id} claimTicket={(e) => {this.claimTicket(e, 'gameOne') } } matchData={this.state.matches.gameOne}></Match>
      <Match key={this.state.matches.gameOne.id + "a"} claimTicket={(e) => {this.claimTicket(e, 'gameOne') } } matchData={this.state.matches.gameOne}></Match>
      <Match key={this.state.matches.gameOne.id + "b"} claimTicket={(e) => {this.claimTicket(e, 'gameOne') } } matchData={this.state.matches.gameOne}></Match>
    </div>
    )
  }
}

export default App;
