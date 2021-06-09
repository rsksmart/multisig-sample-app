import React from 'react'
import { mount } from 'enzyme'
import Modal from './Modal'

describe('Component: Modal', () => {
  const wrapper = mount(<Modal handleClose={jest.fn()}><p>hello world</p></Modal>)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('has content', () => {
    expect(wrapper.find('.modalContent').text()).toBe('hello world')
  })

  it('handles closing', () => {
    const handleClose = jest.fn()
    const localWrapper = mount(<Modal handleClose={handleClose}><p>hello world</p></Modal>)
    localWrapper.find('button.close').simulate('click')
    expect(handleClose).toBeCalledTimes(1)
  })
})
