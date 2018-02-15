import { oneLine } from 'common-tags'

import { App } from 'src/lib'

describe('App', () => {
  beforeEach(() => {
    App.namespace = 'test'
  })

  afterEach(() => {
    App.__memoized__.clear() // eslint-disable-line no-underscore-dangle
  })

  describe('.currentUser', () => {
    it('returns the current user’s login', () => {
      document.head.innerHTML = '<meta content="tester" name="octolytics-actor-login">'
      expect(App.currentUser).toBe('tester')
    })
  })

  describe('.controlsSandbox', () => {
    it('returns a new element, prepended to the .project-header’s last child', () => {
      document.body.innerHTML = oneLine`
        <div class="project-header-controls">
          <div></div>
          <div></div>
        </div>
      `

      const controlsSandbox = App.controlsSandbox

      expect(controlsSandbox.id).toBe('test-sandbox')
      expect(document.querySelector('.project-header-controls :first-child')).toBe(controlsSandbox)
    })
  })

  describe('.addCardsSandbox', () => {
    it('returns the “add cards” parent element if it exists', () => {
      document.body.innerHTML = oneLine`
        <div class="foo">
          <div class="project-header-link" aria-label="Toggle add cards to project"></div>
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
          <div class="project-header-link" aria-label="Toggle project menu"></div>
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

  describe('.init()', () => {
    const {
      addTooltipsToHeaderLinks,
    } = App

    beforeEach(() => {
      App.addTooltipsToHeaderLinks = jest.fn()
    })

    afterEach(() => {
      App.addTooltipsToHeaderLinks = addTooltipsToHeaderLinks
    })

    it('adds tooltips', () => {
      App.init()

      expect(App.addTooltipsToHeaderLinks).toHaveBeenCalled()
    })
  })

  describe('.addTooltipsToHeaderLinks()', () => {
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
})
