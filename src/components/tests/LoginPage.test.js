import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { LoginPage } from '../LoginPage';

const props = {
  login: () => null,
  logout: () => null,
  user: {}
}
describe('LoginPage Component', () => {
  it('renders without crashing', () => {
    shallow(<LoginPage { ...props } />)
  })
})
