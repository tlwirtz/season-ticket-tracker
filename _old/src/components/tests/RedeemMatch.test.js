import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { RedeemMatch } from '../RedeemMatch';
import { describe, it } from 'vitest'

const props = {
  claimTicket: () => null,
  user: {},
  match: {}
}

describe('RedeemMatch Component', () => {
  it.skip('renders without crashing', () => {
    // shallow(<RedeemMatch {...props} />)
  })
})
