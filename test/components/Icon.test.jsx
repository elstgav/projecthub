import React from 'react'
import { shallow } from 'enzyme'

import Icon from 'components/Icon'

describe('Icon', () => {
  let props
  let describedComponent

  const icon = () => {
    describedComponent = describedComponent || shallow(<Icon {...props} />)
    return describedComponent
  }

  beforeEach(() => {
    props = {
      icon: Object.keys(Icon.paths)[0],
    }
    describedComponent = undefined
  })

  it('displays a <svg> element', () => {
    expect(icon().find('svg')).toHaveLength(1)
    expect(icon().find('path').prop('d')).toBe(Icon.paths[props.icon])
    expect(icon().props().className).toBe(`octicon octicon-${props.icon} `)
    expect(icon().html()).toMatchSnapshot()
  })

  it('has a configurable className', () => {
    props.className = 'foo'
    expect(icon().props().className).toBe(`octicon octicon-${props.icon} foo`)
  })

  it('sets [aria-hidden] to true unless there’s an [aria-label]', () => {
    expect(icon().prop('aria-hidden')).toBe(true)

    icon().setProps({ ariaLabel: 'Foo' })

    expect(icon().prop('aria-hidden')).toBe(false)
    expect(icon().prop('aria-label')).toBe('Foo')
  })

  it('has configurable size', () => {
    props.height = Icon.defaultProps.height * 2
    props.width  = Icon.defaultProps.width  * 2

    expect(icon().props()).toMatchObject({ height: props.height, width: props.width })
  })
})
