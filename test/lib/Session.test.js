import { App, Session } from 'src/lib'
import { fooLabel, cachedUser } from 'test/fixtures'

import {
  Label,
  User,
} from 'src/models'

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

    it('returns hydrated Users', () => {
      const hydratedUser = Session.deserialize(JSON.stringify({
        __constructor__: cachedUser.CACHE_KEY,
        ...cachedUser,
      }))

      expect(hydratedUser).toBeInstanceOf(User)
      expect(
        Object.entries(hydratedUser).toString(),
      ).toEqual(
        Object.entries(cachedUser).toString(),
      )
    })

    it('returns hydrated Labels', () => {
      const hydratedLabel = Session.deserialize(JSON.stringify({
        __constructor__: fooLabel.CACHE_KEY,
        ...fooLabel,
      }))

      expect(hydratedLabel).toBeInstanceOf(Label)
      expect(
        Object.entries(hydratedLabel).toString(),
      ).toEqual(
        Object.entries(fooLabel).toString(),
      )
    })

    it('throws an error for unrecognized dehydrated objects', () => {
      expect(() => {
        Session.deserialize(JSON.stringify({
          __constructor__: 'foo',
          foo:             'bar',
        }))
      }).toThrow('Don’t know how to deserialize foo')
    })
  })

  describe('.get()', () => {
    beforeEach(() => {
      sessionStorage.setItem(`${App.namespace}-foo`, '"bar"')
    })

    it('returns a value from session storage', () => {
      expect(Session.get('foo')).toBe('bar')
    })

    it('returns undefined if key doesn’t exist', () => {
      expect(Session.get('nope')).toBeUndefined()
    })

    it('returns a default value if key doesn’t exist', () => {
      expect(Session.get('nope', 'yup')).toBe('yup')
    })
  })

  describe('.set()', () => {
    it('sets a value in session storage', () => {
      Session.set('new', 'value')
      expect(sessionStorage.getItem(`${App.namespace}-new`)).toBe('"value"')
    })

    it('sets a value based on the previous value', () => {
      Session.set('counter', 1)
      Session.set('counter', prev => prev + 1)
      expect(sessionStorage.getItem(`${App.namespace}-counter`)).toBe('2')
    })
  })
})
