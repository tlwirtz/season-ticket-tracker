import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import About from '../About';

describe('About Component', () => {
  it('renders without crashing', () => {
    shallow(<About />)
  })
})
