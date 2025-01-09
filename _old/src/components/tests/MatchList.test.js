import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { MatchList } from '../MatchList';
import { describe, it } from 'vitest'

const props = {
  matches: {
    matchOne: {
      awayTeam: {
        name: 'testname',
        img: 'testimg'
      }
    }
  },
  onMatchClick: () => null
}

describe('MatchList Component', () => {
  it.skip('renders without crashing', () => {
    // shallow(<MatchList {...props } />)
  })
})
