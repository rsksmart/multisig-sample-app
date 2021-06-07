import React from 'react'
import { mount } from 'enzyme'
import ConnectToSafeComponent from './ConnectToSafeComponent'

describe('Component: ConnectToSafeComponent', () => {
  const sharedProps = { connectToSafe: jest.fn() }
  const wrapper = mount(<ConnectToSafeComponent {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('handles submit with new address', () => {
    wrapper.find('.safeAddress').simulate('change', { target: { value: '0x123456789' } })
    wrapper.find('.connect').simulate('click')

    expect(sharedProps.connectToSafe).toBeCalledWith('0x123456789')
  })
})
