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

    const newAddDropdown = stringToDOM(`<div class="pl-4"><div className="${App.namespace}-add-dropdown dropdown"></div></div>`)
    document.querySelector('.project-header').lastElementChild.append(newAddDropdown)

    return newAddDropdown.firstElementChild
  },

  @Memoized
  get menuSandbox() {
    const menuLink = document.querySelector('.project-header-link[aria-label="Menu"]')
    if (menuLink) return menuLink.parentElement

    const newMenuDropdown = stringToDOM(`<div class="pl-4"><div className="${App.namespace}-menu-dropdown dropdown"></div></div>`)
    document.querySelector('.project-header').lastElementChild.append(newMenuDropdown)

    return newMenuDropdown.firstElementChild
  },

  @Memoized
  get hiddenClass() {
    return `${this.namespace}-is-hidden`
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
    document.querySelectorAll('.js-project-fullscreen-link:not(.btn-link)').forEach((link) => {
      link.classList.add('btn-link')
    })
  },
}

export default App