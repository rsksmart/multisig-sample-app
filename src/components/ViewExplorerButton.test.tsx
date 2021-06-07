import React from 'react'
import { mount } from 'enzyme'
import ViewExplorerButton from './ViewExplorerButton'

describe('Component: ViewExplorerButton', () => {
  const sharedProps = { address: '0x123' }
  it('renders the component with the correct value', () => {
    const wrapper = mount(<ViewExplorerButton {...sharedProps} />)
    expect(wrapper).toBeDefined()
    expect(wrapper.find('a').props().href).toBe('http://explorer.testnet.rsk.co/address/0x123')
  })
})
