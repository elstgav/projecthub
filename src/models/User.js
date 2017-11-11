import axios from 'axios'

import { Session, Storage } from 'src/models'

const ID_FROM_IMG_SRC = /\/u\/(\d+)\?/
const USER_NAMES_KEY  = 'user-names'

const userNames = Session.get(USER_NAMES_KEY) || {}

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
      this.fetchNameFromApi()
    }

    return name
  }

  fetchNameFromApi() {
    Storage.get('githubToken', (settings) => {
      const requestOptions = {}

      if (settings.githubToken) {
        requestOptions.headers = { Authorization: `token ${settings.githubToken}` }
      }

      // TODO: Create GitHub API model. Handles authentictation and standard error messages.
      axios
        .get(`https://api.github.com/users/${this.login}`, requestOptions)
        .then((response) => {
          const name = response.data.name || this.login
          userNames[this.login] = name
          Session.set(USER_NAMES_KEY, userNames)
        })
        .catch((error) => {
          console.error(error.message)
          // TODO: Handle bad credentials (ask to fix credentials)
          // TODO: Handle rate limit exceeded (ask for credentials)
          // TODO: Handle 404
        })
    })
  }
}
