import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Admin } from '../Admin';
import { describe, it } from 'vitest'


const props = {
  user: {},
  claimedMatches: []
}

describe('Admin Component', () => {
  it.skip('renders without crashing', () => {
    // shallow(<Admin { ...props } />)
  })
})
