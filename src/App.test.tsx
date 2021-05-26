import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('App test', () => {
  it('renders the component', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toBeDefined()
  })

  it('loads the SVG image without character issues', () => {
    const wrapper = shallow(<App />)
    const image = wrapper.find('img')
    expect(image.hasClass('App-logo')).toBeTruthy()
    expect(image.props().src).toBe('logo.svg')
  })

  it('matches anchor text', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('a').text()).toBe('Learn React')
  })
})
