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
  get settingsSandbox() {
    const settingsLink = document.querySelector('.project-header-link[aria-label="Settings"]')
    if (settingsLink) return settingsLink.parentElement

    const newSettingsDropdown = stringToDOM(`<div class="pl-4"><div className="${App.namespace}-settings-dropdown dropdown"></div></div>`)
    document.querySelector('.project-header').lastElementChild.append(newSettingsDropdown)

    return newSettingsDropdown.firstElementChild
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
