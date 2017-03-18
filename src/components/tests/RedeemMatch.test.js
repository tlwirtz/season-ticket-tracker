import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { RedeemMatch } from '../RedeemMatch';

describe('RedeemMatch Component', () => {
  it('renders without crashing', () => {
    shallow(<RedeemMatch />)
  })
})
