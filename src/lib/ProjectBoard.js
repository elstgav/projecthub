import { isEmpty, uniqBy, sortBy } from 'lodash'

import { GitHubSelectors, Storage } from 'src/lib'
import { Label, User } from 'src/models'
import { memoize, show, hide } from 'src/utils'

/* eslint-disable class-methods-use-this */

class ProjectBoard {
  CACHE_KEY = 'projectBoardState'

  defaultState = {
    hideNewColumnButton: false,
  }

  @memoize
  get isEditable() {
    return !!document.querySelector(GitHubSelectors.addCardsButton)
  }

  @memoize
  get container() {
    return document.querySelector(GitHubSelectors.projectColumnsContainer)
  }

  @memoize
  get afterLoaded() {
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        if (this.container.querySelector(GitHubSelectors.projectLoadingIndicator)) return

        resolve()
        observer.disconnect()
      })

      observer.observe(this.container, { childList: true, subtree: true })
    })
  }

  @memoize
  get newColumnButton() {
    return this.container.querySelector(GitHubSelectors.newColumnButton)
  }

  get cards() {
    return Array.from(this.container.querySelectorAll(GitHubSelectors.card))
  }

  get columns() {
    return Array.from(this.container.querySelectorAll(GitHubSelectors.column))
  }

  get assignees() {
    const avatars = Array.from(this.container.querySelectorAll(GitHubSelectors.avatar))
    if (isEmpty(avatars)) return []

    let users = avatars.map(avatar => User.fromAvatarElement(avatar))
    users = uniqBy(users, user => user.id)
    users = sortBy(users, [user => user.name.toLowerCase()])

    return users
  }

  get labels() {
    let labels = Array.from(this.container.querySelectorAll(GitHubSelectors.label))
    if (isEmpty(labels)) return []

    labels = labels.map(label => Label.fromLabelElement(label))
    labels = uniqBy(labels, label => label.id)
    labels = sortBy(labels, [label => label.val.toLowerCase()])

    return labels
  }

  async init() {
    await this.afterLoaded

    this.renderNewColumnButton()
  }

  async shouldHideNewColumnButton() {
    const boardState = await Storage.get({
      [this.CACHE_KEY]: this.defaultState,
    })
    return boardState[this.CACHE_KEY].hideNewColumnButton
  }

  async toggleNewColumnButton() {
    if (!this.newColumnButton) return

    const prevState = await Storage.get(this.CACHE_KEY)
    Storage.set({
      [this.CACHE_KEY]: {
        ...prevState,
        hideNewColumnButton: !(prevState && prevState.hideNewColumnButton),
      },
    })

    await this.renderNewColumnButton()
  }

  async renderNewColumnButton() {
    if (!this.newColumnButton) return
    const shouldHide = await this.shouldHideNewColumnButton()
    shouldHide ? hide(this.newColumnButton) : show(this.newColumnButton)
  }
}

const ProjectBoardSingleton = new ProjectBoard()

export default ProjectBoardSingleton
