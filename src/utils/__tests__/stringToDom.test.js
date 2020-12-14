import { stringToDOM } from 'src/utils'

describe('stringToDOM', () => {
  it('creates a DOM node from a string', () => {
    const el = document.createElement('div')
    el.classList.add('foo')
    el.innerHTML = 'Test'
    expect(stringToDOM('<div class="foo">Test</div>')).toEqual(el)
  })
})
