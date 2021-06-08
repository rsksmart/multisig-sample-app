import React from 'react'
import { mount } from 'enzyme'
import ValueWithButtons from './ValueWithButtons'

describe('Component: ValueWithButtons', () => {
  const sharedProps = { value: 'helloWorld' }
  const wrapper = mount(<ValueWithButtons {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('shows the copy button', () => {
    expect(wrapper.find('.copyText').props().defaultValue).toBe('helloWorld')
  })

  it('has correct explorer link', () => {
    expect(wrapper.find('a.explorerLink').props().href).toBe('http://explorer.testnet.rsk.co/address/helloworld')
  })
})
