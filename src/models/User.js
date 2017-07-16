const ID_FROM_IMG_SRC = /\/u\/(\d+)\?/

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
}
