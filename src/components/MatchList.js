import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Match from './Match'

class MatchList extends Component {
  render() {
    const items = Object.keys(this.props.matches).map((key) => {
      const bg = this.props.matches[key].awayTeam.img
      return (
        <ReactCSSTransitionGroup
        transitionName="match-animation"
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={300}
        key={key}
        className='match'
        style={{backgroundImage: `url(${bg})`}}
        >
        <Match
          key={key}
          matchData={this.props.matches[key]}
          {...this.props}/>
      </ReactCSSTransitionGroup>
      )
    }
  )
    return (
      <div className='match-container'>
        { items }
      </div>
    )
  }
}

export default MatchList
