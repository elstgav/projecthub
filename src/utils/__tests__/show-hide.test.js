import App from 'src/lib/App'
import { show, hide } from 'src/utils'

const isVisible = el => !el.classList.contains(App.hiddenClass)

describe('show/hide', () => {
  it('toggles an element’s visibility', () => {
    const el = document.createElement('div')
    expect(isVisible(el)).toBe(true)
    hide(el)
    expect(isVisible(el)).toBe(false)
    show(el)
    expect(isVisible(el)).toBe(true)
  })
})
