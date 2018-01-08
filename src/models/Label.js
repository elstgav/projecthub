import { pick } from 'lodash'
import BaseModel from './BaseModel'

export default class Label extends BaseModel {
  static CACHE_KEY = 'label'

  static fromLabelElement = label => new Label({
    id:    label.textContent.trim(),
    val:   label.textContent.trim(),
    style: pick(label.style, ['backgroundColor', 'color']),
  })

  constructor({ id, val, style }) {
    super()

    this.id    = id
    this.val   = val
    this.style = style
  }
}
