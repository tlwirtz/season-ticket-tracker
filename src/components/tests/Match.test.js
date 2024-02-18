import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Match } from '../Match';
import { describe, it } from 'vitest'

const props = {
  matchData: {
    awayTeam: { name: 'test' },
    date: Date.now().toLocaleString(),
  }
}

describe('Match Component', () => {
  it.skip('renders without crashing', () => {
    // shallow(<Match {...props} />)
  })
})
