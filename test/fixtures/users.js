import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import Session from 'src/lib/Session'
import User from 'src/models/User'

// Mock session storage
Session.set(User.USER_NAMES_KEY, {
  test1: 'Tester McGoo',
  test2: 'test2',
})

// Mock GitHub API calls
const mock = new MockAdapter(axios)
mock.onGet('https://api.github.com/users/test3').reply(200, { name: 'Tester McGee' })
mock.onGet('https://api.github.com/users/test4').reply(200, { name: null           })

export const cachedUser = new User({
  id:     1,
  login:  'test1',
  avatar: 'test1.jpg',
})

export const cachedUserWithNoName = new User({
  id:     2,
  login:  'test2',
  avatar: 'test2.jpg',
})

export const uncachedUser = new User({
  id:     3,
  login:  'test3',
  avatar: 'test3.jpg',
})

export const uncachedUserWithNoName = new User({
  id:     4,
  login:  'test4',
  avatar: 'test4.jpg',
})
