import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { LoginPage } from '../LoginPage';

describe('LoginPage Component', () => {
  it('renders without crashing', () => {
    shallow(<LoginPage />)
  })
})
