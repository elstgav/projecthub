import { oneLine } from 'common-tags'

import { App } from 'src/lib'

describe('App', () => {
  beforeEach(() => {
    App.namespace = 'test'
  })

  afterEach(() => {
    document.body.innerHTML = ''
    App.__memoized__.clear() // eslint-disable-line no-underscore-dangle
  })

  describe('.currentUser', () => {
    it('returns the current user’s login', () => {
      document.head.innerHTML = oneLine`
        <meta content="tester" name="octolytics-actor-login">
      `

      expect(App.currentUser).toBe('tester')
    })
  })

  describe('.controlsSandbox', () => {
    it('returns a new element, prepended to the .project-header’s last child', () => {
      document.body.innerHTML = oneLine`
        <div class="project-header">
          <div></div>
          <div></div>
          <div class="foo">
            <div></div>
            <div></div>
          </div>
        </div>
      `

      const controlsSandbox = App.controlsSandbox

      expect(controlsSandbox.id).toBe('test-sandbox')
      expect(document.querySelector('.foo :first-child')).toBe(controlsSandbox)
    })
  })

  describe('.addCardsSandbox', () => {
    it('returns the “add cards” parent element if it exists', () => {
      document.body.innerHTML = oneLine`
        <div class="foo">
          <div class="project-header-link" aria-label="Add cards"></div>
        </div>
      `

      expect(App.addCardsSandbox.classList).toContain('foo')
    })

    it('throws an error if “add cards” element does not exist', () => {
      expect(() => App.addCardsSandbox).toThrow('Could not find “Add cards” link!')
    })
  })

  describe('.menuSandbox', () => {
    it('returns the “menu” parent element if it exists', () => {
      document.body.innerHTML = oneLine`
        <div class="foo">
          <div class="project-header-link" aria-label="Menu"></div>
        </div>
      `

      expect(App.menuSandbox.classList).toContain('foo')
    })

    it('throws an error if “menu” element does not exist', () => {
      expect(() => App.menuSandbox).toThrow('Could not find “Menu” link!')
    })
  })


  describe('.hiddenClass', () => {
    it('returns a name-spaced hidden class', () => {
      expect(App.hiddenClass).toBe('test-is-hidden')
    })
  })

  describe('.init', () => {
    const {
      addTooltipsToHeaderLinks,
      fixFullScreenButtonAlignment,
    } = App

    beforeEach(() => {
      App.addTooltipsToHeaderLinks     = jest.fn()
      App.fixFullScreenButtonAlignment = jest.fn()
    })

    afterEach(() => {
      App.addTooltipsToHeaderLinks     = addTooltipsToHeaderLinks
      App.fixFullScreenButtonAlignment = fixFullScreenButtonAlignment
    })

    it('adds tooltips and fixes full-screen button alignment', () => {
      App.init()

      expect(App.addTooltipsToHeaderLinks    ).toHaveBeenCalled()
      expect(App.fixFullScreenButtonAlignment).toHaveBeenCalled()
    })
  })

  describe('.addTooltipsToHeaderLinks', () => {
    it('adds tooltip classes and aria-labels to project header links ', () => {
      document.body.innerHTML = oneLine`
        <button class="project-header-link">First link</button>
        <button class="project-header-link" aria-label="Pre-existing label">Second link</button>
        <a href="#!" class="project-header-link">Third link</a>
      `
      const link1 = document.querySelector('.project-header-link:nth-child(1)')
      const link2 = document.querySelector('.project-header-link:nth-child(2)')
      const link3 = document.querySelector('.project-header-link:nth-child(3)')

      App.addTooltipsToHeaderLinks()

      expect(link1.classList).toContain('tooltipped')
      expect(link1.getAttribute('aria-label')).toBe('First link')
      expect(link2.classList).toContain('tooltipped')
      expect(link2.getAttribute('aria-label')).toBe('Pre-existing label')
      expect(link3.classList).toContain('tooltipped')
      expect(link3.getAttribute('aria-label')).toBe('Third link')
    })
  })

  describe('.fixFullScreenButtonAlignment', () => {
    it('adds a .btn-link class to the full-screen link if it’s missing', () => {
      document.body.innerHTML = oneLine`
        <button class="js-project-fullscreen-link"></button>
        <button class="js-project-fullscreen-link btn-link"></button>
      `
      const link1 = document.querySelector('.js-project-fullscreen-link:nth-child(1)')
      const link2 = document.querySelector('.js-project-fullscreen-link:nth-child(2)')

      App.fixFullScreenButtonAlignment()

      expect(link1.classList).toContain('btn-link')
      expect(link2.classList.length).toBe(2)
    })
  })
})
