import { stringToDOM, Memoized } from 'src/utils'

const App = {
  namespace:   'projecthub',

  currentUser:  document.getElementsByName('octolytics-actor-login')[0].content,

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
    document.querySelector('.js-project-fullscreen-link:not(.btn-link)').classList.add('btn-link')
  },
}

export default App
