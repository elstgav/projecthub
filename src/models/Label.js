import { pick } from 'lodash'

const ID_FROM_LABEL_CLASS = /labelstyle-(\w+)/

export default class Label {
  static fromLabelElement = label => new Label({
    id:    label.classList.value.match(ID_FROM_LABEL_CLASS)[1],
    val:   label.textContent,
    style: pick(label.style, ['backgroundColor', 'color']),
  })

  constructor({ id, val, style }) {
    this.id    = id
    this.val   = val
    this.style = style
  }
}
