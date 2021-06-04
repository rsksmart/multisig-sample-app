import React from 'react'
import { mount } from 'enzyme'
import CreateSafeComponent from './CreateSafeComponent'

describe('Component: CreateSafeComponent', () => {
  const sharedProps = {
    connectAddress: '0x3dd03d7d6c3137f1eb7582ba5957b8a2e26f304a',
    handleError: jest.fn(),
    createSafe: jest.fn()
  }
  const wrapper = mount(<CreateSafeComponent {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('sets the initial address', () => {
    expect(wrapper.find('.address0').props().value).toBe(sharedProps.connectAddress)
  })

  it('increase and decrease the amount of text inputs and threshold amounts', () => {
    wrapper.find('button.addAddress').simulate('click')
    expect(wrapper.find('li')).toHaveLength(2)
    expect(wrapper.find('select').find('option')).toHaveLength(2)

    wrapper.find('button.removeAddress0').simulate('click')
    expect(wrapper.find('li')).toHaveLength(1)
    expect(wrapper.find('.address0').props().value).toBe('')
    expect(wrapper.find('select').find('option')).toHaveLength(1)
  })

  it('handles errors when an address is wrong', () => {
    const localProps = {
      ...sharedProps,
      handleError: jest.fn()
    }
    const localWrapper = mount(<CreateSafeComponent {...localProps} />)
    localWrapper.find('button.addAddress').simulate('click')
    localWrapper.find('button.submit').simulate('click')

    expect(localProps.handleError).toBeCalledTimes(1)
    expect(localProps.handleError).toBeCalledWith(new Error('Incorrect Addresses for: 2'))
  })

  it('handles successfully create', () => {
    const localProps = {
      ...sharedProps,
      createSafe: jest.fn()
    }
    const localWrapper = mount(<CreateSafeComponent {...localProps} />)

    localWrapper.find('button.submit').simulate('click')
    expect(localProps.createSafe).toBeCalledWith([sharedProps.connectAddress], 1)
  })
})
