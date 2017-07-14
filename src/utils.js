const hiddenClass = 'gpf-is-hidden'

export function hide(el) {
  el.classList.add(hiddenClass)
}

export function show(el) {
  el.classList.remove(hiddenClass)
}

export function stringToDOM(string) {
  const template = document.createElement('template')
  template.innerHTML = string
  return template.content.firstElementChild
}
