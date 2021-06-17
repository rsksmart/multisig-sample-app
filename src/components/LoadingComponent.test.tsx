import React from 'react'
import { mount } from 'enzyme'
import LoadingComponent from './LoadingComponent'

describe('Component: LoadingComponent', () => {
  it('renders the component', () => {
    const wrapper = mount(<LoadingComponent />)
    expect(wrapper).toBeDefined()
  })

  it('shows text', () => {
    const wrapper = mount(<LoadingComponent text="hello world" />)
    expect(wrapper.find('p').at(1).text()).toBe('hello world')
  })

  it('shows just a hash', () => {
    const wrapper = mount(<LoadingComponent hash="0x1234" />)
    expect(wrapper.find('p').at(1).text()).toBe(' View it on the explorer ')
    expect(wrapper.find('a').props().href).toBe('http://explorer.testnet.rsk.co/tx/0x1234')
  })

  it('shows both text and hash', () => {
    const wrapper = mount(<LoadingComponent text="hello world" hash="0x1234" />)
    expect(wrapper.find('p').at(1).text()).toBe('hello world View it on the explorer ')
  })
})
