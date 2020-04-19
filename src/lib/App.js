import GitHubSelectors from 'src/lib/GitHubSelectors'
import { stringToDOM, memoize } from 'src/utils'

/* eslint-disable class-methods-use-this */

class App {
  namespace = 'projecthub'

  @memoize
  get currentUser() {
    return document.getElementsByName(GitHubSelectors.names.currentUser)[0].content
  }

  @memoize
  get controlsSandbox() {
    const sandboxElement = stringToDOM(`<div id="${this.namespace}-sandbox" class="ml-2"></div>`)

    document.querySelector(GitHubSelectors.projectHeaderControls).prepend(sandboxElement)

    return sandboxElement
  }

  @memoize
  get addCardsSandbox() {
    const addLink = document.querySelector(GitHubSelectors.addCardsButton)
    if (addLink) return addLink.parentElement

    throw new Error('Could not find “Add cards” link!')
  }

  @memoize
  get menuSandbox() {
    const menuLink = document.querySelector(GitHubSelectors.menuButton)
    if (menuLink) return menuLink.parentElement

    throw new Error('Could not find “Menu” link!')
  }

  @memoize
  get hiddenClass() {
    return `${this.namespace}-is-hidden`
  }
}

const AppSingleton = new App()

export default AppSingleton
