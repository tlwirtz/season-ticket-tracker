import React, { Component } from 'react'
import MatchList from './MatchList'
import '../styles/App.css'

class Home extends Component {
  render() {
    return <MatchList {... this.props} />
  }
}

export default Home;
