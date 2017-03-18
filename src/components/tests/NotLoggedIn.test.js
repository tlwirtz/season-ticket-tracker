import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import NotLoggedIn from '../NotLoggedIn';

describe('NotLoggedIn Component', () => {
  it('renders without crashing', () => {
    shallow(<NotLoggedIn />)
  })
})
