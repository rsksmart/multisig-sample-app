import React from 'react'
import { mount } from 'enzyme'
import AddOwnerModal from './AddOwnerModal'
import { safeSingletonAddress } from '../../../config/local.json'

describe('Component: AddOwnerModal', () => {
  const sharedProps = { numberOfOwners: 4, handleSubmit: jest.fn(), handleError: jest.fn() }

  it('renders the component', () => {
    const wrapper = mount(<AddOwnerModal {...sharedProps} />)
    expect(wrapper).toBeDefined()
  })

  it('select box has one more than number of Onwers', () => {
    const wrapper = mount(<AddOwnerModal {...sharedProps} />)
    expect(wrapper.find('option')).toHaveLength(5)
  })

  it('handles error checking on submit', () => {
    const localProps = { ...sharedProps, handleError: jest.fn() }
    const wrapper = mount(<AddOwnerModal {...localProps} />)

    wrapper.find('input.newOwner').simulate('change', { target: { value: 'hello' } })
    wrapper.find('button').simulate('click')

    expect(localProps.handleError).toBeCalledWith(new Error('Value is not an address.'))
  })

  it('handles correct submit', () => {
    const localProps = { ...sharedProps, handleSubmit: jest.fn() }
    const wrapper = mount(<AddOwnerModal {...localProps} />)

    wrapper.find('input.newOwner').simulate('change', { target: { value: safeSingletonAddress } })
    wrapper.find('button').simulate('click')

    expect(localProps.handleSubmit).toBeCalledWith(safeSingletonAddress.toLowerCase(), 4)
  })
})
