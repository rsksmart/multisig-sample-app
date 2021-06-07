import React from 'react'
import { mount } from 'enzyme'
import ChangeThresholdModal from './ChangeThresholdModal'

describe('Component: ChangeThresholdModal', () => {
  const sharedProps = { numberOfOwners: 4, currentThreshold: 3, handleSubmit: jest.fn() }
  const wrapper = mount(<ChangeThresholdModal {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('has correct starting numbers', () => {
    expect(wrapper.find('select').props().value).toBe(3)
    expect(wrapper.find('option')).toHaveLength(4)
  })

  it('handles submit', () => {
    const handleSubmit = jest.fn()
    const localWrapper = mount(<ChangeThresholdModal {...sharedProps} handleSubmit={handleSubmit} />)

    localWrapper.find('button').simulate('click')
    expect(handleSubmit).toBeCalledWith(3)
  })
})
