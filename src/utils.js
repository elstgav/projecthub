const hiddenClass = 'gpf-is-hidden'

export const App = {
  currentUser:  document.getElementsByName('octolytics-actor-login')[0].content,
  projectBoard: document.querySelector('.project-columns-container'),
}

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
