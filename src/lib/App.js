import { GitHubSelectors } from 'src/lib'
import { stringToDOM, Memoized } from 'src/utils'

const App = {
  namespace: 'projecthub',

  @Memoized
  get currentUser() {
    return document.getElementsByName(GitHubSelectors.names.currentUser)[0].content
  },

  @Memoized
  get controlsSandbox() {
    const sandboxElement = stringToDOM(`<div id="${this.namespace}-sandbox" class="ml-2"></div>`)

    document.querySelector(GitHubSelectors.projectHeaderControls).prepend(sandboxElement)

    return sandboxElement
  },

  @Memoized
  get addCardsSandbox() {
    const addLink = document.querySelector(GitHubSelectors.addCardsButton)
    if (addLink) return addLink.parentElement

    throw new Error('Could not find “Add cards” link!')
  },

  @Memoized
  get menuSandbox() {
    const menuLink = document.querySelector(GitHubSelectors.menuButton)
    if (menuLink) return menuLink.parentElement

    throw new Error('Could not find “Menu” link!')
  },

  @Memoized
  get hiddenClass() {
    return `${this.namespace}-is-hidden`
  },
}

export default App
