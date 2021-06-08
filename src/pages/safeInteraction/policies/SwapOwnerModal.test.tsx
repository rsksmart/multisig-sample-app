import React from 'react'
import { mount } from 'enzyme'
import SwapOwnerModal from './SwapOwnerModal'
import { safeSingletonAddress } from '../../../config/local.json'

describe('Component: SwapOwnerModal', () => {
  const sharedProps = { handleError: jest.fn(), handleSubmit: jest.fn(), oldAddress: '0x123' }
  const wrapper = mount(<SwapOwnerModal {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('returns an error when not an address', () => {
    wrapper.find('button').simulate('click')
    expect(sharedProps.handleError).toBeCalledWith(new Error('Address is not valid'))
  })

  it('returns old and new address on success', () => {
    wrapper.find('input.newAddress').simulate('change', { target: { value: safeSingletonAddress } })
    wrapper.find('button').simulate('click')

    expect(sharedProps.handleSubmit).toBeCalledWith('0x123', safeSingletonAddress.toLowerCase())
  })
})
