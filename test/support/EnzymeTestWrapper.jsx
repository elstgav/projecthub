import React from 'react'
import { shallow, mount, render } from 'enzyme'

import { Memoized } from 'src/utils'

/**
 * EnzymeTestWrapper
 *
 * Makes it easy to use Enzyme in your tests without cross-contamination
 *
 * @see http://airbnb.io/enzyme/
 *
 */
export default class EnzymeTestWrapper {
  static tests = []
  static renderers = { shallow, mount, render }

  /**
   * EnzymeTestWrapper.resetAll()
   *
   * Calls .reset() on every instance of EnzymeTestWrapper
   */
  static resetAll() {
    EnzymeTestWrapper.tests.map(test => test.reset())
  }

  /**
   * EnzymeTestWrapper
   *
   * Lets you easily create tests of React components, using enzyme’s rendering methods. The
   * component is reset for every test, and isn’t rendered until you call .rendered or
   * .ComponentName, so you can change props right up until render.
   *
   * Originally inspired by the boilerplate suggested here:
   * https://medium.freecodecamp.org/the-right-way-to-test-react-components-548a4736ab22#df5e
   *
   * @constructor
   *
   * @param {React.Component} Component
   *   The React component you want to test
   *
   * @param {string} [renderer='shallow']
   *   The enzyme render method to use for rendering the component
   *   One of: shallow|mount|render
   *   Defaults to shallow
   *   See http://airbnb.io/enzyme/
   *
   * @return {EnzymeTestWrapper}
   *
   * @property {Object} props
   *   The props to pass to the React component
   *
   * @property {Object} renderOptions
   *   options to pass to the Enzyme render method
   *
   * @property {function} renderer
   *   The enzyme render method used to render the component
   *
   * @example A shallow-rendered component
   *   const test = new EnzymeTestWrapper(UserAvatar)
   *   test.props = { user: testUser }
   *   expect(test.UserAvatar.find('img').prop('src')).toBe(testUser.avatarSrc)
   *
   * @example A mounted component
   *   new EnzymeTestWrapper(UserAvatar, 'mount')
   *
   * @example A static-rendered component
   *   new EnzymeTestWrapper(UserAvatar, 'render')
   */
  constructor(Component, renderer = 'shallow') {
    this.props         = {}
    this.component     = Component
    this.renderer      = EnzymeTestWrapper.renderers[renderer]
    this.renderOptions = {}

    EnzymeTestWrapper.tests.push(this)

    // Setup dynamic Component property. e.g:
    // const test = new EnzymeTestWrapper(FooBar)
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
   * returns the Enzyme-rendered component, based on the current `.props` and `.renderOptions`
   *
   * EnzymeTestWrapper also generates an alias of this method based off the tested component’s name,
   * for better readability of tests
   *
   * @example
   *   const test = new EnzymeTestWrapper(MyButton)
   *   // test.MyButton === test.rendered
   *   expect(test.MyButton.text()).toBe('Click me')
   *
   * @alias [Component.name]
   *
   * @return {EnzymeWrapper} The component rendered by enzyme
   *
   * @see http://airbnb.io/enzyme/
   */
  @Memoized
  get rendered() {
    return this.renderer(<this.component {...this.props} />, this.renderOptions)
  }

  /**
   * .nextTick()
   *
   * lets you check the component’s render state after process.nextTick(), useful for when the
   * component’s render depends on an asynchronous call.
   *
   * @example awaiting the next render…
   *   const test = new EnzymeTestWrapper(LoadingWindow)
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
   * @return {Promise} A promise that resolves on process.nextTick()
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
   * Resets the component’s `.props` and `.renderOptions`, so it can be rendered anew
   */
  reset() {
    this.props   = {}
    this.renderOptions = {}
    if (this.__memoized__) this.__memoized__.clear() // eslint-disable-line no-underscore-dangle
  }
}

beforeEach(() => {
  EnzymeTestWrapper.resetAll()
})
