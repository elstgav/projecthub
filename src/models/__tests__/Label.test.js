import { oneLine } from 'common-tags'

import { Label } from 'src/models'
import { stringToDOM } from 'src/utils'

describe('Label', () => {
  describe('.fromLabelElement()', () => {
    it('creates a new Label from a label element', () => {
      const labelElement = stringToDOM(oneLine`
        <button
          class="IssueLabel hx_IssueLabel width-fit js-card-filter mt-1 mr-1"
          data-card-filter="label:&quot;Foo Bar&quot;"
          data-name="Foo Bar"
          style="--label-r:212;--label-g:197;--label-b:249;--label-h:257;--label-s:81;--label-l:87;"
          type="button"
        >
          <span class="css-truncate css-truncate-target width-fit">Foo Bar</span>
        </button>
      `)

      const label = Label.fromLabelElement(labelElement)

      expect(label.id).toBe('Foo Bar')
      expect(label.val).toBe('Foo Bar')
      expect(label.color).toMatchObject({
        r: 212,
        g: 197,
        b: 249,
        h: 257,
        s: 81,
        l: 87,
      })
    })
  })
})
