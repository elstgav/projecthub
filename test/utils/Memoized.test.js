import { Memoized } from 'src/utils'

/* eslint-disable no-plusplus, no-underscore-dangle */

describe('Memoized', () => {
  let obj

  beforeEach(() => {
    obj = {
      i: 1,

      @Memoized
      get iterator() {
        return this.i++
      },
    }
  })

  it('memoizes a computed property after it is first accessed', () => {
    expect(obj.iterator).toEqual(1)
    expect(obj.iterator).toEqual(1)
    expect(obj.iterator).toEqual(1)
  })

  it('can clear its cached value', () => {
    expect(obj.iterator).toEqual(1)
    expect(obj.iterator).toEqual(1)
    expect(obj.iterator).toEqual(1)
    obj.__memoized__.delete('iterator')
    expect(obj.iterator).toEqual(2)
    expect(obj.iterator).toEqual(2)
    expect(obj.iterator).toEqual(2)
    obj.__memoized__.delete('iterator')
    expect(obj.iterator).toEqual(3)
    expect(obj.iterator).toEqual(3)
    expect(obj.iterator).toEqual(3)
  })
})
