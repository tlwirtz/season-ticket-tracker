import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { MatchList } from '../MatchList';

const props = {
  matches: [
    {
      awayTeam: {
        name: 'testname',
        img: 'testimg'
      }
    }
  ],
  onMatchClick: () => null
}
describe('MatchList Component', () => {
  it('renders without crashing', () => {
    shallow(<MatchList {...props } />)
  })
})
