import React from 'react'
import { shallow, mount, render } from 'enzyme'

import { Memoized } from 'src/utils'


export default class ReactComponentTest {
  static tests = []
  static renderMethods = { shallow, mount, render }

  static resetAll() {
    ReactComponentTest.tests.map(test => test.reset())
  }

  constructor(Component, renderMethod = 'shallow') {
    this.props     = {}
    this.component = Component
    this.render    = ReactComponentTest.renderMethods[renderMethod]

    ReactComponentTest.tests.push(this)

    return new Proxy(this, {
      get: (target, prop) => {
        if (prop === Component.name) return this.rendered
        return target[prop]
      },
    })
  }

  @Memoized
  get rendered() {
    return this.render(<this.component {...this.props} />)
  }

  /* eslint-disable no-underscore-dangle */
  reset() {
    this.props = {}
    if (this.__memoized__) this.__memoized__.clear()
  }
  /* eslint-enable */
}

beforeEach(() => {
  ReactComponentTest.resetAll()
})
