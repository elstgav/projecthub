import App from 'src/lib/App'

export function show(el) {
  el.classList.remove(App.hiddenClass)
}

export function hide(el) {
  el.classList.add(App.hiddenClass)
}
