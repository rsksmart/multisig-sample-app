import React from 'react'
import { mount } from 'enzyme'
import TransferTokenModal from './TransferTokenModal'
import { safeSingletonAddress } from '../../../config/local.json'

describe('Component: TransferTokenModal', () => {
  const token = {
    symbol: 'rif',
    decimals: 18,
    amount: 10,
    contractAddress: '0x123'
  }
  const sharedProps = { token, handleError: jest.fn(), createTransaction: jest.fn() }
  const wrapper = mount(<TransferTokenModal {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('shows error if address is incorrect', () => {
    wrapper.find('button.submit').simulate('click')
    expect(sharedProps.handleError).toBeCalledWith(new Error('Recipient is not an address.'))
  })

  it('shows error when transfer amount is zero', () => {
    wrapper.find('input.recipient').simulate('change', { target: { value: safeSingletonAddress } })
    wrapper.find('button.submit').simulate('click')
    expect(sharedProps.handleError).toBeCalledWith(new Error('Amount should be between 1 and 10.'))
  })

  it('submits', () => {
    wrapper.find('input.amount').simulate('change', { target: { value: '4' } })
    wrapper.find('button.submit').simulate('click')
    expect(sharedProps.createTransaction).toBeCalledWith('0x123', 4, safeSingletonAddress.toLowerCase())
  })
})
