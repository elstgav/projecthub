import BaseModel from './BaseModel'

export default class Label extends BaseModel {
  static CACHE_KEY = 'label'

  static fromLabelElement = label => new Label({
    id:    label.textContent.trim(),
    val:   label.textContent.trim(),
    color: {
      r: parseInt(label.style.getPropertyValue('--label-r'), 10),
      g: parseInt(label.style.getPropertyValue('--label-g'), 10),
      b: parseInt(label.style.getPropertyValue('--label-b'), 10),
      h: parseInt(label.style.getPropertyValue('--label-h'), 10),
      s: parseInt(label.style.getPropertyValue('--label-s'), 10),
      l: parseInt(label.style.getPropertyValue('--label-l'), 10),
    },
  })

  constructor({ id, val, color }) {
    super()

    this.id    = id
    this.val   = val
    this.color = color
  }
}
