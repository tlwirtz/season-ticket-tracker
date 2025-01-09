import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Alert } from '../Alert';
import { describe, it } from 'vitest'


const props = {
  msg: 'hello world',
  status: 'normal'
}
describe('Alert Component', () => {
  it.skip('renders without crashing', () => {
    // shallow(<Alert  {...props } />)
  })
})
