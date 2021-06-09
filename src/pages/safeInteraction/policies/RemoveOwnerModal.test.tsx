import React from 'react'
import { mount } from 'enzyme'
import RemoveOwnerModal from './RemoveOwnerModal'

describe('Component: RemoveOwnerModal', () => {
  const sharedProps = { numberOfOwners: 3, handleSubmit: jest.fn(), removeAddress: 'hello' }
  const wrapper = mount(<RemoveOwnerModal {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('submits with the value', () => {
    wrapper.find('button').simulate('click')
    expect(sharedProps.handleSubmit).toBeCalledWith('hello', 2)
  })
})
