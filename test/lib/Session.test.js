import Session from 'src/lib/Session'

import { testLabel, testUser } from 'test/fixtures'

describe('Session', () => {
  describe('.serialize()', () => {
    it('turns an object into JSON', () => {
      expect(Session.serialize({ foo: 'bar' })).toBe(JSON.stringify({ foo: 'bar' }))
    })

    it('correctly serializes a model', () => {
      expect(
        Session.serialize(testLabel),
      ).toBe(JSON.stringify({
        __constructor__: 'label',
        ...testLabel,
      }))
    })
  })

  describe('.deserialize()', () => {
    it('returns an object', () => {
      expect(Session.deserialize(JSON.stringify({ foo: 'bar' }))).toEqual({ foo: 'bar' })
    })

    it('returns a hydrated object', () => {
      const hydratedLabel = Session.deserialize(JSON.stringify({
        __constructor__: testUser.CACHE_KEY,
        ...testUser,
      }))

      expect(hydratedLabel).toBeInstanceOf(testUser.constructor)
      expect(
        Object.entries(hydratedLabel).toString(),
      ).toEqual(
        Object.entries(testUser).toString(),
      )
    })
  })
})
