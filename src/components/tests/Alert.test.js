import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Alert } from '../Alert';

describe('Alert Component', () => {
  it('renders without crashing', () => {
    shallow(<Alert />)
  })
})
