/* eslint-disable no-param-reassign, no-prototype-builtins, no-underscore-dangle */
export default function Memoized(target, propertyKey, descriptor) {
  const originalGet = descriptor.get

  descriptor.get = function memoizedGet() {
    if (!this.hasOwnProperty('__memoized__')) {
      Object.defineProperty(this, '__memoized__', { value: new Map() })
    }

    return this.__memoized__.has(propertyKey) ?
      this.__memoized__.get(propertyKey) :
      (() => {
        const value = originalGet.call(this)
        this.__memoized__.set(propertyKey, value)
        return value
      })()
  }
}
/* eslint-enable */
