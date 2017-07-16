import { isEmpty, uniqBy, sortBy } from 'lodash'

import { Label, User } from 'src/models'
import { stringToDOM } from 'src/utils'

const App = {
  namespace:   'gpf',

  currentUser:  document.getElementsByName('octolytics-actor-login')[0].content,
  projectBoard: document.querySelector('.project-columns-container'),

  get sandbox() {
    const sandboxElement = stringToDOM(`<div id="${this.namespace}-sandbox" class="ml-2"></div>`)
    document.querySelector('.project-header').lastElementChild.prepend(sandboxElement)

    // Memoize
    delete this.sandbox
    this.sandbox = sandboxElement
    return sandboxElement
  },

  get hiddenClass() {
    const hiddenClass = `${this.namespace}-is-hidden`

    // Memoize
    delete this.hiddenClass
    this.hiddenClass = hiddenClass
    return hiddenClass
  },

  get afterBoardLoaded() {
    const afterBoardLoaded = new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const finishedLoading = this.projectBoard.querySelector('include-fragment') === null

        if (finishedLoading) {
          resolve()
          observer.disconnect()
        }
      })

      observer.observe(this.projectBoard, { childList: true, subtree: true })
    })

    // Memoize
    delete this.afterBoardLoaded
    this.afterBoardLoaded = afterBoardLoaded
    return afterBoardLoaded
  },

  get cards() {
    return Array.from(this.projectBoard.querySelectorAll('.issue-card'))
  },

  get columns() {
    return Array.from(this.projectBoard.querySelectorAll('.project-column'))
  },

  get assignees() {
    const avatars = Array.from(this.projectBoard.querySelectorAll('.avatar-stack .avatar'))
    if (isEmpty(avatars)) return []

    let users = avatars.map(avatar => User.fromAvatarElement(avatar))
    users = uniqBy(users, user => user.id)
    users = sortBy(users, [user => user.login.toLowerCase()])

    return users
  },

  get labels() {
    let labels = Array.from(this.projectBoard.querySelectorAll('.issue-card-label'))
    if (isEmpty(labels)) return []

    labels = labels.map(label => Label.fromLabelElement(label))
    labels = uniqBy(labels, label => label.id)
    labels = sortBy(labels, [label => label.val.toLowerCase()])

    return labels
  },
}

export default App
