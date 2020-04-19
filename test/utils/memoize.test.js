import { memoize } from 'src/utils'

/* eslint-disable no-plusplus, no-underscore-dangle */

class Foo {
  i = 1

  j = 1

  @memoize
  get iterator() {
    return this.i++
  }

  @memoize
  get multiplier() {
    this.j *= 2
    return this.j
  }
}

describe('memoize', () => {
  let foo

  beforeEach(() => {
    foo = new Foo()
  })

  it('memoizes a computed property after it is first accessed', () => {
    expect(foo.iterator).toEqual(1)
    expect(foo.iterator).toEqual(1)
    expect(foo.iterator).toEqual(1)
  })

  it('supports multiple memoized properties', () => {
    expect(foo.iterator).toEqual(1)
    expect(foo.iterator).toEqual(1)
    expect(foo.iterator).toEqual(1)
    expect(foo.multiplier).toEqual(2)
    expect(foo.multiplier).toEqual(2)
    expect(foo.multiplier).toEqual(2)
  })

  it('can clear its cached values', () => {
    expect(foo.iterator).toEqual(1)
    expect(foo.iterator).toEqual(1)
    foo.__memoized__.delete('iterator')
    expect(foo.iterator).toEqual(2)
    expect(foo.iterator).toEqual(2)
    foo.__memoized__.delete('iterator')
    expect(foo.iterator).toEqual(3)
    expect(foo.iterator).toEqual(3)

    expect(foo.multiplier).toEqual(2)
    expect(foo.multiplier).toEqual(2)
    foo.__memoized__.delete('multiplier')
    expect(foo.multiplier).toEqual(4)
    expect(foo.multiplier).toEqual(4)
    foo.__memoized__.delete('multiplier')
    expect(foo.multiplier).toEqual(8)
    expect(foo.multiplier).toEqual(8)
  })

  it('only applies to getter methods', () => {
    expect(() => {
      class Bar { // eslint-disable-line no-unused-vars
        i = 1

        @memoize
        iterator() {
          return this.i++
        }
      }
    }).toThrow('can only be applied to getters')
  })
})
