const hiddenClass = 'gpf-is-hidden'

export function hide(el) {
  el.classList.add(hiddenClass)
}

export function show(el) {
  el.classList.remove(hiddenClass)
}
