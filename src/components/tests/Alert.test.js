import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Alert } from '../Alert';

const props = {
  msg: 'hello world',
  status: 'normal'
}
describe('Alert Component', () => {
  it('renders without crashing', () => {
    shallow(<Alert  {...props } />)
  })
})
