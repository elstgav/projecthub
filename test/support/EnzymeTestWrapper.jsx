import React from 'react'
import { shallow, mount, render } from 'enzyme'

import { memoize } from 'src/utils'

/**
 * EnzymeTestWrapper
 *
 * Makes it easier to use Enzyme without cross-contaminating state and props between tests
 *
 * @see http://airbnb.io/enzyme/
 *
 */
export default class EnzymeTestWrapper {
  static tests = []

  static renderMethods = {
    shallow,
    fullDOM:    mount,
    staticHTML: render,
  }

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
   * @return {EnzymeTestWrapper}
   *
   * @property {Object} props
   *   The props to pass to the React component
   *
   * @property {function} renderMethod (EnzymeTestWrapper.renderMethods.shallow)
   *   The enzyme render method to use for rendering the component
   *   See EnzymeTestWrapper.renderMethods for available options
   *   Defaults to shallow
   *   See https://airbnb.io/enzyme/docs/api/
   *
   * @property {Object} renderOptions
   *   options to pass to the Enzyme render method
   *   See each render method’s options on https://airbnb.io/enzyme/docs/api/
   *
   * @property {EnzymeWrapper} rendered (or your ComponentName)
   *   returns an enzyme ShallowWrapper, ReactWrapper, or CheerioWrapper depending on .renderMethod,
   *   rendered with the current .props and .renderOptions
   *
   *   You can access this property with your component’s name, e.g.
   *
   *   ```js
   *   const test = new EnzymeTestWrapper(UserAvatar)
   *   test.props = { user: testUser }
   *   test.UserAvatar // => equivalent to enzyme’s shallow(<UserAvatar user={testUser} />)
   *   ````
   *
   * @example A shallow-rendered test (equivalent to enzyme.shallow)
   *   The default form of test.
   *
   *   Shallow rendering is useful to constrain yourself to testing a component as a unit, and to
   *   ensure that your tests aren't indirectly asserting on behavior of child components.
   *
   *   See https://airbnb.io/enzyme/docs/api/shallow.html
   *
   *   ```js
   *   const test = new EnzymeTestWrapper(UserAvatar)
   *   test.props = { user: testUser }
   *   expect(test.UserAvatar.find('img').prop('src')).toBe(testUser.avatarSrc)
   *   ```
   *
   * @example A full-DOM-rendered test (equivalent to enzyme.mount)
   *   Full DOM rendering is ideal for use cases where you have components that may interact with
   *   DOM APIs or need to test components that are wrapped in higher order components.
   *
   *   See https://airbnb.io/enzyme/docs/api/mount.html
   *
   *   ```js
   *   const test = new EnzymeTestWrapper(Foo)
   *   test.renderMethod = EnzymeTestWrapper.renderMethods.fullDOM
   *   ```
   *
   * @example A static-HTML-rendered test (equivalent to enzyme.render)
   *   Static HTML rendering is useful for analyzing the HTML structure of your rendered component.
   *
   *   See https://airbnb.io/enzyme/docs/api/render.html
   *
   *   ```js
   *   const test = new EnzymeTestWrapper(Foo)
   *   test.renderMethod = EnzymeTestWrapper.renderMethods.staticHTML
   *   ```
   */
  constructor(Component) {
    this.Component = Component
    this.setDefaults()

    EnzymeTestWrapper.tests.push(this)

    // Setup dynamic Component property. e.g:
    // const test = new EnzymeTestWrapper(FooBar)
    // test.FooBar => the rendered component
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop === this.Component.name) return this.rendered
        return target[prop]
      },
    })
  }

  setDefaults() {
    this.props = {}
    this.renderOptions = {}
    this.renderMethod = EnzymeTestWrapper.renderMethods.shallow
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
  @memoize
  get rendered() {
    return this.renderMethod(<this.Component {...this.props} />, this.renderOptions)
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
   * Resets the component so it can be rendered anew
   */
  reset() {
    this.setDefaults()
    if (this.__memoized__) this.__memoized__.clear() // eslint-disable-line no-underscore-dangle
  }
}

beforeEach(() => {
  EnzymeTestWrapper.resetAll()
})
