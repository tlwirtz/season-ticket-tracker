import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { LoginPage } from '../LoginPage';
import { describe, it } from 'vitest'

const props = {
  login: () => null,
  logout: () => null,
  user: {}
}
describe('LoginPage Component', () => {
  it.skip('renders without crashing', () => {
    // shallow(<LoginPage {...props} />)
  })
})
