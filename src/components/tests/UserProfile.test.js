import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { UserProfile } from '../UserProfile';

describe('UserProfile Component', () => {
  it('renders without crashing', () => {
    shallow(<UserProfile />)
  })
})
