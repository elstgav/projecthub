import { isEmpty, uniqBy, sortBy } from 'lodash'

import { Label, User } from 'src/models'
import { Memoized } from 'src/utils'

const ProjectBoard = {
  @Memoized
  get readOnly() {
    return !document.querySelector('.project-header-link[aria-label="Add cards"]')
  },

  @Memoized
  get ref() {
    return document.querySelector('.project-columns-container')
  },

  @Memoized
  get afterLoaded() {
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const finishedLoading = this.ref.querySelector('include-fragment') === null

        if (finishedLoading) {
          resolve()
          observer.disconnect()
        }
      })

      observer.observe(this.ref, { childList: true, subtree: true })
    })
  },

  get cards() {
    return Array.from(this.ref.querySelectorAll('.issue-card'))
  },

  get columns() {
    return Array.from(this.ref.querySelectorAll('.project-column'))
  },

  get assignees() {
    const avatars = Array.from(this.ref.querySelectorAll('.avatar-stack .avatar'))
    if (isEmpty(avatars)) return []

    let users = avatars.map(avatar => User.fromAvatarElement(avatar))
    users = uniqBy(users, user => user.id)
    users = sortBy(users, [user => user.login.toLowerCase()])

    return users
  },

  get labels() {
    let labels = Array.from(this.ref.querySelectorAll('.issue-card-label'))
    if (isEmpty(labels)) return []

    labels = labels.map(label => Label.fromLabelElement(label))
    labels = uniqBy(labels, label => label.id)
    labels = sortBy(labels, [label => label.val.toLowerCase()])

    return labels
  },
}

export default ProjectBoard
