import { isEmpty, uniqBy, sortBy } from 'lodash'

import { Label, User } from 'src/models'
import { stringToDOM, Memoized } from 'src/utils'

const App = {
  namespace:   'gpf',

  currentUser:  document.getElementsByName('octolytics-actor-login')[0].content,
  projectBoard: document.querySelector('.project-columns-container'),

  @Memoized
  get sandbox() {
    const sandboxElement = stringToDOM(`<div id="${this.namespace}-sandbox" class="ml-2"></div>`)
    document.querySelector('.project-header').lastElementChild.prepend(sandboxElement)

    return sandboxElement
  },

  @Memoized
  get hiddenClass() {
    return `${this.namespace}-is-hidden`
  },

  @Memoized
  get afterBoardLoaded() {
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const finishedLoading = this.projectBoard.querySelector('include-fragment') === null

        if (finishedLoading) {
          resolve()
          observer.disconnect()
        }
      })

      observer.observe(this.projectBoard, { childList: true, subtree: true })
    })
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

  init() {
    this.addTooltipsToHeaderLinks()
    this.fixFullScreenButtonAlignment()
  },

  addTooltipsToHeaderLinks() {
    document.querySelectorAll('.project-header-link').forEach((link) => {
      if (!link.hasAttribute('aria-label')) {
        link.setAttribute('aria-label', link.textContent.trim())
      }

      link.classList.add('tooltipped', 'tooltipped-w')
    })
  },

  // Fix full-screen button alignment (See #11)
  fixFullScreenButtonAlignment() {
    document.querySelector('.project-header-link:not(.btn-link)').classList.add('btn-link')
  },
}

export default App
