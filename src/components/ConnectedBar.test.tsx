import React from 'react'
import { mount } from 'enzyme'
import ConnectedBar from './ConnectedBar'

describe('Component: ConnectedBar', () => {
  const sharedProps = { chainId: 31 }
  const wrapper = mount(<ConnectedBar {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('shows testnet', () => {
    expect(wrapper.find('.chainId').text()).toBe('RSK Testnet')
  })

  it('shows mainnet', () => {
    const localWrapper = mount(<ConnectedBar chainId={30} />)
    expect(localWrapper.find('.chainId').text()).toBe('RSK Mainnet')
  })
})
