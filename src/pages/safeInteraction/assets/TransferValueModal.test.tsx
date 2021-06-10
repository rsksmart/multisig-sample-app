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
    wrapper.find('#to').simulate('change', { target: { value: safeSingletonAddress } })

    console.log(wrapper.debug())
    wrapper.find('button').simulate('click')

    // expect(sharedProps.handleError).toBeCalledWith()
  })
})
