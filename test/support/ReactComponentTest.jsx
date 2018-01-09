import React from 'react'
import { shallow, mount, render } from 'enzyme'

import { Memoized } from 'src/utils'


export default class ReactComponentTest {
  static tests = []
  static renderMethods = { shallow, mount, render }

  /**
   * ReactComponentTest.resetAll()
   *
   * Calls .reset() on every instance of ReactComponentTest
   */
  static resetAll() {
    ReactComponentTest.tests.map(test => test.reset())
  }

  /**
   * ReactComponentTest
   *
   * Lets you easily create tests of React components, using enzyme’s rendering methods. The component is reset for every
   * test, and isn’t rendered until you call .rendered/.ComponentName, so you can change props right up until render.
   *
   * @constructor
   *
   * @example A shallow-rendered component
   *   const test = new ReactComponentTest(UserAvatar)
   *   test.props = { user: testUser }
   *   expect(test.UserAvatar.find('img').prop('src')).toBe(testUser.avatarSrc)
   *
   * @example A mounted component
   *   new ReactComponentTest(UserAvatar, mount)
   *
   * @example A static-rendered component
   *   new ReactComponentTest(UserAvatar, render)
   *
   * @param   {React}   Component
   *   The React component you want to test
   *
   * @param   {String}  renderMethod  (shallow)
   *   The enzyme render method to use for rendering the component
   *   One of: shallow|mount|render
   *   Defaults to shallow
   *   See http://airbnb.io/enzyme/
   *
   * @return  {ReactComponentTest}
   */
  constructor(Component, renderMethod = 'shallow') {
    this.props         = {}
    this.enzymeOptions = {}
    this.component     = Component
    this.render        = ReactComponentTest.renderMethods[renderMethod]

    ReactComponentTest.tests.push(this)

    // Setup dynamic Component property. e.g:
    // const test = new ReactComponentTest(FooBar)
    // test.FooBar => the rendered component
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop === Component.name) return this.rendered
        return target[prop]
      },
    })
  }

  /**
   * .rendered
   *
   * rendered returns the Enzyme-rendered component, based on the current `.props` and `.enzymeOptions`
   *
   * ReactComponentTest also generates an alias of this method based off the tested component’s name, for better readability
   * of tests
   *
   * @example
   *   const test = new ReactComponentTest(Button)
   *   // test.Button === test.rendered
   *   expect(test.Button.text()).toBe('Click me')
   *
   * @alias [Component.name]
   *
   * @return  {EnzymeWrapper}  The component rendered by enzyme
   *
   * @see http://airbnb.io/enzyme/
   */
  @Memoized
  get rendered() {
    return this.render(<this.component {...this.props} />, this.enzymeOptions)
  }

  /**
   * .nextTick()
   *
   * lets you check the component’s render state after process.nextTick(), useful for when the component’s render depends on
   * an asynchronous call.
   *
   * @example awaiting the next render…
   *   const test = new ReactComponentTest(LoadingWindow)
   *   test.LoadingWindow.simulate('click')
   *
   *   expect(test.LoadingWindow.text()).toBe('Loading…')
   *
   *   // Need to wait for async functionality…
   *   await test.nextTick()
   *
   *   // Now the async functionality should be done
   *   expect(test.LoadingWindow.text()).toBe('Loaded!')
   *
   * @return  {Promise}  A promise that resolves on process.nextTick()
   */
  nextTick() {
    return new Promise((resolve) => {
      process.nextTick(() => {
        this.rendered.update()
        resolve()
      })
    })
  }

  /**
   * .reset()
   *
   * Resets the component’s `.props` and `.enzymeOptions`, so it can be rendered anew
   */
  reset() {
    this.props   = {}
    this.enzymeOptions = {}
    if (this.__memoized__) this.__memoized__.clear() // eslint-disable-line no-underscore-dangle
  }
}

beforeEach(() => {
  ReactComponentTest.resetAll()
})
