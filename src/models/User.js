import { GitHubAPI, Session } from 'src/lib'
import { memoize } from 'src/utils'

import BaseModel from './BaseModel'

export default class User extends BaseModel {
  static CACHE_KEY = 'user'
  static ID_FROM_IMG_SRC = /\/u\/(\d+)\?/
  static USER_NAMES_KEY = 'user-names'

  static fetchedNames = new Set()

  @memoize
  static get names() {
    return Session.get(User.USER_NAMES_KEY, {})
  }

  static fromAvatarElement = avatar => new User({
    id:     avatar.src.match(User.ID_FROM_IMG_SRC)[1],
    login:  avatar.alt.substring(1),
    avatar: avatar.src,
  })

  constructor({ id, login, avatar }) {
    super()

    this.id     = id
    this.login  = login
    this.avatar = avatar
  }

  get name() {
    return User.names[this.login] || this.fallbackName()
  }

  fallbackName() {
    if (!User.fetchedNames.has(this.login)) this.fetchNameFromApi()

    return this.login
  }

  async fetchNameFromApi() {
    User.fetchedNames.add(this.login)

    const user = await GitHubAPI.getUser(this.login)
    const name = user.name || this.login
    User.names[this.login] = name

    Session.set(User.USER_NAMES_KEY, User.names)
  }
}
