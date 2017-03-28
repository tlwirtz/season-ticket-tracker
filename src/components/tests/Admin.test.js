import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Admin } from '../Admin';

const props = {
  user: {},
  claimedMatches: []
}

describe('Admin Component', () => {
  it('renders without crashing', () => {
    shallow(<Admin { ...props } />)
  })
})
