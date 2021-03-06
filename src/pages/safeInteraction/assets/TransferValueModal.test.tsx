import React from 'react'
import { mount } from 'enzyme'
import TransferValueModal from './TransferValueModal'
import { safeSingletonAddress } from '../../../config/local.json'

describe('Component: TransferValueModal', () => {
  const sharedProps = { createTransaction: jest.fn(), handleError: jest.fn() }
  const wrapper = mount(<TransferValueModal {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('shows an error when address is incorrect', () => {
    wrapper.find('button').simulate('click')
    expect(sharedProps.handleError).toBeCalledWith(new Error('Recipient is not an address.'))
  })

  it('submits the correct info', () => {
    wrapper.find('input.to').simulate('change', { target: { value: safeSingletonAddress } })
    wrapper.find('input.amount').simulate('change', { target: { value: '20000' } })

    wrapper.find('button.submit').simulate('click')

    expect(sharedProps.createTransaction).toBeCalledWith(safeSingletonAddress.toLowerCase(), 20000, '0x')
  })

  it('has data when it is sent', () => {
    wrapper.find('input.to').simulate('change', { target: { value: safeSingletonAddress } })
    wrapper.find('input.amount').simulate('change', { target: { value: '20000' } })
    wrapper.find('textarea').simulate('change', { target: { value: '0x123456789' } })

    wrapper.find('button.submit').simulate('click')

    expect(sharedProps.createTransaction).toBeCalledWith(safeSingletonAddress.toLowerCase(), 20000, '0x123456789')
  })
})
