import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { NavBar } from '../NavBar';
import { describe, it } from 'vitest'

const props = {
  user: { uid: 'testuid', user: 'testuser' },
  logout: () => null
}

describe('NavBar Component', () => {
  it.skip('renders without crashing', () => {
    // shallow(<NavBar {...props} />)
  })
})
