import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Match } from '../Match';

const props = {
  matchData: {
    awayTeam: { name: 'test' },
    date: Date.now().toLocaleString(),
  }
}

describe('Match Component', () => {
  it('renders without crashing', () => {
    shallow(<Match { ...props }/>)
  })
})
