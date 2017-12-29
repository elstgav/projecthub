export default function stringToDOM(string) {
  const template = document.createElement('template')
  template.innerHTML = string
  return template.content.firstElementChild
}
