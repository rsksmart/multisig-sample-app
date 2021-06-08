import React from 'react'
import { mount } from 'enzyme'
import CopyValueButton from './CopyValueButton'

describe('Component: CopyValueButton', () => {
  const sharedProps = { value: 'hello' }
  const wrapper = mount(<CopyValueButton {...sharedProps} />)

  it('renders the component', () => {
    expect(wrapper).toBeDefined()
  })

  it('sets the defaultValue in the textInput', () => {
    expect(wrapper.find('input').props().defaultValue).toBe('hello')
  })
})
