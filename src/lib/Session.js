import { App } from 'src/lib'

import {
  BaseModel,
  Label,
  User,
} from 'src/models'


const Session = {
  serialize(obj) {
    return JSON.stringify(obj)
  },

  deserialize(json) {
    return JSON.parse(json, (key, val) => {
      if (!val || !val[BaseModel.SERIALIZE_KEY]) return val

      switch (val[BaseModel.SERIALIZE_KEY]) {
        case Label.CACHE_KEY:
          return new Label(val)
        case User.CACHE_KEY:
          return new User(val)

        default:
          throw new Error(`Don’t know how to deserialize ${val[BaseModel.SERIALIZE_KEY]}`)
      }
    })
  },

  get(key, defaultVal) {
    return this.deserialize(sessionStorage.getItem(`${App.namespace}-${key}`)) || defaultVal
  },

  set(key, val) {
    return sessionStorage.setItem(`${App.namespace}-${key}`, this.serialize(val))
  },
}

export default Session
