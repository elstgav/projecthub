import User from 'src/models/User'

User.names = {
  test: 'Tester McGoo',
}

export const testUser = new User({
  id:     1,
  login:  'test',
  avatar: 'test.jpg',
})

export const testUserWithNoName = new User({
  id:     2,
  login:  'test2',
  avatar:  'test2.jpg',
})
