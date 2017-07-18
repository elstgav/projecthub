import { App } from 'src/models'

const Session = {
  get(key) {
    return JSON.parse(sessionStorage.getItem(`${App.namespace}-${key}`))
  },

  set(key, val) {
    return sessionStorage.setItem(`${App.namespace}-${key}`, JSON.stringify(val))
  },
}

export default Session
