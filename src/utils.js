import { App } from 'src/models'

export function show(el) {
  el.classList.remove(App.hiddenClass)
}

export function hide(el) {
  el.classList.add(App.hiddenClass)
}

export function stringToDOM(string) {
  const template = document.createElement('template')
  template.innerHTML = string
  return template.content.firstElementChild
}
