import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Admin } from '../Admin';

describe('Admin Component', () => {
  it('renders without crashing', () => {
    shallow(<Admin />)
  })
})
