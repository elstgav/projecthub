import { oneLine } from 'common-tags'

import App from 'src/lib/App'

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
          <a class="project-header-link js-show-project-triage"></a>
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
          <div class="project-header-link js-show-project-menu"></div>
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
})
