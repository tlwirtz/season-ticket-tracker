import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { NavBar } from '../NavBar';

const props = {
  user: { uid: 'testuid', user: 'testuser' },
}

describe('NavBar Component', () => {
  it('renders without crashing', () => {
    shallow(<NavBar {...props } />)
  })
})
