import Button from 'components/Button'
import ReactComponentTest from 'test/support/ReactComponentTest'

const test = new ReactComponentTest(Button)

describe('Button', () => {
  beforeEach(() => {
    test.props = { children: 'Foo' }
  })

  it('displays a <button> element', () => {
    expect(test.Button.find('button')).toHaveLength(1)
    expect(test.Button.props().className).toBe('btn btn-default  ')
    expect(test.Button.text()).toBe('Foo')
    expect(test.Button.html()).toMatchSnapshot()
  })

  it('has a configurable className', () => {
    test.props.className = 'foo'
    expect(test.Button.props().className).toBe('btn btn-default  foo')
  })

  describe('when isActive', () => {
    beforeEach(() => {
      test.props.isActive = true
    })

    it('adds a selected class', () => {
      expect(test.Button.props().className).toBe('btn btn-default selected ')
    })
  })
})
