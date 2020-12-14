import { BaseModel } from 'src/models'

describe('BaseModel', () => {
  it('requires a class to implement a cache key', () => {
    class Foo extends BaseModel {}

    expect(() => {
      new Foo().cacheKey()
    }).toThrowError('Foo.CACHE_KEY is undefined')
  })

  it('includes the cache key when converted to JSON', () => {
    class Foo extends BaseModel {
      static CACHE_KEY = 'foo-cache-key'

      constructor() {
        super()

        this.foo = 'bar'
      }
    }

    expect(
      JSON.stringify(new Foo()),
    ).toEqual(
      JSON.stringify({
        __constructor__: 'foo-cache-key',
        foo: 'bar',
      }),
    )
  })
})
