import React from 'react'
import { shallow } from 'enzyme'

import Button from 'components/Button'

describe('Button', () => {
  let props
  let describedComponent

  const button = () => {
    describedComponent = describedComponent || shallow(<Button {...props} />)
    return describedComponent
  }

  beforeEach(() => {
    props = {
      children: 'Foo',
    }
    describedComponent = undefined
  })

  it('displays a <button> element', () => {
    expect(button().find('button')).toHaveLength(1)
    expect(button().props().className).toBe('btn btn-default  ')
    expect(button().text()).toBe('Foo')
    expect(button().html()).toMatchSnapshot()
  })

  it('has a configurable className', () => {
    props.className = 'foo'
    expect(button().props().className).toBe('btn btn-default  foo')
  })

  describe('when isActive', () => {
    beforeEach(() => {
      props.isActive = true
    })

    it('adds a selected class', () => {
      expect(button().props().className).toBe('btn btn-default selected ')
    })
  })
})
