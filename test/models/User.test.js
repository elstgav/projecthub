import { oneLine } from 'common-tags'

import { User } from 'src/models'
import { Session } from 'src/lib'
import { stringToDOM } from 'src/utils'

import {
  cachedUser,
  uncachedUser,
  uncachedUserWithNoName,
} from 'test/fixtures'

describe('User', () => {
  describe('.names', () => {
    it('only fetches from session storage once', () => {
      const spy = jest.spyOn(Session, 'get')
      expect(User.names).toBeDefined()
      expect(User.names).toBeDefined()
      expect(spy).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })
  })

  describe('.fromAvatarElement', () => {
    it('creates a new user from an avatar element', () => {
      const avatar = stringToDOM(oneLine`
        <img
          alt="@bobby"
          src="https://avatars3.githubusercontent.com/u/123456?s=40&v=4"
          height="20"
          width="20"
        >
      `)

      const bobby = User.fromAvatarElement(avatar)
      expect(bobby.id).toBe('123456')
      expect(bobby.login).toBe('bobby')
      expect(bobby.avatar).toBe('https://avatars3.githubusercontent.com/u/123456?s=40&v=4')
    })
  })

  describe('#name', () => {
    it('returns the user’s cached name', () => {
      expect(User.names[cachedUser.login]).toBe('Tester McGoo')
      expect(cachedUser.name).toBe('Tester McGoo')
    })

    it('returns the user’s name from GitHub if it isn’t cached', (done) => {
      expect(uncachedUser.name).toBe(uncachedUser.login)

      process.nextTick(() => {
        expect(uncachedUser.name).toBe('Tester McGee')
        done()
      })
    })

    it('returns the user’s login if name isn’t found', (done) => {
      expect(uncachedUserWithNoName.name).toBe(uncachedUserWithNoName.login)

      process.nextTick(() => {
        expect(uncachedUserWithNoName.name).toBe(uncachedUserWithNoName.login)
        done()
      })
    })
  })
})
