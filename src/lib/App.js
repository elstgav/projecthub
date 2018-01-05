import { stringToDOM, Memoized } from 'src/utils'

const App = {
  namespace: 'projecthub',

  @Memoized
  get currentUser() {
    return document.getElementsByName('octolytics-actor-login')[0].content
  },

  @Memoized
  get controlsSandbox() {
    const sandboxElement = stringToDOM(`<div id="${this.namespace}-sandbox" class="ml-2"></div>`)

    document.querySelector('.project-header').lastElementChild.prepend(sandboxElement)

    return sandboxElement
  },

  @Memoized
  get addCardsSandbox() {
    const addLink = document.querySelector('.project-header-link[aria-label="Add cards"]')
    if (addLink) return addLink.parentElement

    throw new Error('Could not find “Add cards” link!')
  },

  @Memoized
  get menuSandbox() {
    const menuLink = document.querySelector('.project-header-link[aria-label="Menu"]')
    if (menuLink) return menuLink.parentElement

    throw new Error('Could not find “Menu” link!')
  },

  @Memoized
  get hiddenClass() {
    return `${this.namespace}-is-hidden`
  },

  init() {
    this.addTooltipsToHeaderLinks()
  },

  addTooltipsToHeaderLinks() {
    document.querySelectorAll('.project-header-link').forEach((link) => {
      if (!link.hasAttribute('aria-label')) {
        link.setAttribute('aria-label', link.textContent.trim())
      }

      link.classList.add('tooltipped', 'tooltipped-w')
    })
  },
}

export default App
