import Session from 'src/lib/Session'

import { fooLabel, cachedUser } from 'test/fixtures'

describe('Session', () => {
  describe('.serialize()', () => {
    it('turns an object into JSON', () => {
      expect(Session.serialize({ foo: 'bar' })).toBe(JSON.stringify({ foo: 'bar' }))
    })

    it('correctly serializes a model', () => {
      expect(
        Session.serialize(fooLabel),
      ).toBe(JSON.stringify({
        __constructor__: 'label',
        ...fooLabel,
      }))
    })
  })

  describe('.deserialize()', () => {
    it('returns an object', () => {
      expect(Session.deserialize(JSON.stringify({ foo: 'bar' }))).toEqual({ foo: 'bar' })
    })

    it('returns a hydrated object', () => {
      const hydratedLabel = Session.deserialize(JSON.stringify({
        __constructor__: cachedUser.CACHE_KEY,
        ...cachedUser,
      }))

      expect(hydratedLabel).toBeInstanceOf(cachedUser.constructor)
      expect(
        Object.entries(hydratedLabel).toString(),
      ).toEqual(
        Object.entries(cachedUser).toString(),
      )
    })
  })
})
