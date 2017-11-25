import { GitHubAPI, Session } from 'src/models'

const ID_FROM_IMG_SRC = /\/u\/(\d+)\?/
const USER_NAMES_KEY  = 'user-names'

const userNames = Session.get(USER_NAMES_KEY) || {}
const fetchedNames = {}

export default class User {
  static fromAvatarElement = avatar => new User({
    id:     avatar.src.match(ID_FROM_IMG_SRC)[1],
    login:  avatar.alt.substring(1),
    avatar: avatar.src,
  })

  constructor({ id, login, avatar }) {
    this.id     = id
    this.login  = login
    this.avatar = avatar
  }

  get name() {
    let name = userNames[this.login]

    if (!name) {
      name = this.login

      if (!fetchedNames[name]) {
        this.fetchNameFromApi()
        fetchedNames[name] = true
      }
    }

    return name
  }

  fetchNameFromApi() {
    GitHubAPI.getUser(this.login).then((data) => {
      const name = data.name || this.login
      userNames[this.login] = name
      Session.set(USER_NAMES_KEY, userNames)
    })
  }
}
