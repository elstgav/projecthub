// memoize decorator to cache computed properties
//
// Inspired by http://www.couchcoder.com/using-memoized-decorator-cache-computed-properties/
// and https://github.com/andreypopp/memoize-decorator/blob/master/src/index.js

/* eslint-disable no-param-reassign, no-prototype-builtins, no-underscore-dangle */
export default function memoize({ key, descriptor }) {
  if (typeof descriptor.get !== 'function') {
    throw new Error('@memoize can only be applied to getters')
  }

  const originalGet = descriptor.get

  descriptor.get = function memoizedGet() {
    if (!this.hasOwnProperty('__memoized__')) {
      Object.defineProperty(this, '__memoized__', { value: new Map() })
    }

    return this.__memoized__.has(key) ?
      this.__memoized__.get(key) :
      (() => {
        const value = originalGet.call(this)
        this.__memoized__.set(key, value)
        return value
      })()
  }
}
/* eslint-enable */
