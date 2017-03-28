import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { RedeemMatch } from '../RedeemMatch';

const props = {
  claimTicket: () => null,
  user: {},
  match: {}
}

describe('RedeemMatch Component', () => {
  it('renders without crashing', () => {
    shallow(<RedeemMatch { ...props } />)
  })
})
