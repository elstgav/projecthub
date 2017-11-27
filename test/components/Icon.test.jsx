import Icon from 'components/Icon'
import ReactComponentTest from 'test/support/ReactComponentTest'

const test = new ReactComponentTest(Icon)

describe('Icon', () => {
  beforeEach(() => {
    test.props = {
      icon: Object.keys(Icon.paths)[0],
    }
  })

  it('displays a <svg> element', () => {
    expect(test.Icon.find('svg')).toHaveLength(1)
    expect(test.Icon.find('path').prop('d')).toBe(Icon.paths[test.props.icon])
    expect(test.Icon.props().className).toBe(`octicon octicon-${test.props.icon} `)
    expect(test.Icon.html()).toMatchSnapshot()
  })

  it('has a configurable className', () => {
    test.props.className = 'foo'
    expect(test.Icon.props().className).toBe(`octicon octicon-${test.props.icon} foo`)
  })

  it('sets [aria-hidden] to true unless there’s an [aria-label]', () => {
    expect(test.Icon.prop('aria-hidden')).toBe(true)

    test.Icon.setProps({ ariaLabel: 'Foo' })

    expect(test.Icon.prop('aria-hidden')).toBe(false)
    expect(test.Icon.prop('aria-label')).toBe('Foo')
  })

  it('has configurable size', () => {
    test.props.height = Icon.defaultProps.height * 2
    test.props.width  = Icon.defaultProps.width  * 2

    expect(test.Icon.props()).toMatchObject({ height: test.props.height, width: test.props.width })
  })
})
