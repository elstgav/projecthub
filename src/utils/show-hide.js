import { App } from 'src/models'

export function show(el) {
  el.classList.remove(App.hiddenClass)
}

export function hide(el) {
  el.classList.add(App.hiddenClass)
}
