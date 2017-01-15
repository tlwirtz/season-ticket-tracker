import React, { Component } from 'react'
import MatchList from './MatchList'
import '../styles/App.css'

//TODO -- this is a nice proof of concept.
//TODO -- need to hookup with multiple matches
//TODO -- sync to firebase
//TODO -- add authentication

class Home extends Component {
  render() {
    return <MatchList {... this.props} />
  }
}

export default Home;
