import { GitHubAPI, Session } from 'src/models'

export default class User {
  static ID_FROM_IMG_SRC = /\/u\/(\d+)\?/
  static USER_NAMES_KEY = 'user-names'

  static names = Session.get(User.USER_NAMES_KEY) || {}
  static fetchedNames = {}

  static fromAvatarElement = avatar => new User({
    id:     avatar.src.match(User.ID_FROM_IMG_SRC)[1],
    login:  avatar.alt.substring(1),
    avatar: avatar.src,
  })

  constructor({ id, login, avatar }) {
    this.id     = id
    this.login  = login
    this.avatar = avatar
  }

  get name() {
    return User.names[this.login] || this.fallbackName()
  }

  fallbackName() {
    if (!User.fetchedNames[this.login]) this.fetchNameFromApi()

    return this.login
  }

  async fetchNameFromApi() {
    User.fetchedNames[this.login] = true

    const user = await GitHubAPI.getUser(this.login)
    const name = user.name || this.login
    User.names[this.login] = name

    Session.set(User.USER_NAMES_KEY, User.names)
  }
}
