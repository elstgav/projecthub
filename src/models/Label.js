import { pick } from 'lodash'

export default class Label {
  static fromLabelElement = label => new Label({
    id:    label.textContent,
    val:   label.textContent,
    style: pick(label.style, ['backgroundColor', 'color']),
  })

  constructor({ id, val, style }) {
    this.id    = id
    this.val   = val
    this.style = style
  }
}
