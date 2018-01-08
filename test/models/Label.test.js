import { oneLine } from 'common-tags'

import { Label } from 'src/models'
import { stringToDOM } from 'src/utils'

describe('Label', () => {
  describe('.fromLabelElement()', () => {
    it('creates a new Label from a label element', () => {
      const labelElement = stringToDOM(oneLine`
        <button
          aria-label="Foo Bar"
          class="btn-link js-card-filter-label issue-card-label css-truncate css-truncate-target label mt-1 v-align-middle labelstyle-00ff00 linked-labelstyle-00ff00 tooltipped tooltipped-n"
          data-label="Priority 2"
          style="background-color: #00ff00; color: #fff;"
          type="button"
        >
          Foo Bar
        </button>
      `)

      const label = Label.fromLabelElement(labelElement)

      expect(label.id).toBe('Foo Bar')
      expect(label.val).toBe('Foo Bar')
      expect(label.style).toMatchObject({
        backgroundColor: 'rgb(0, 255, 0)',
        color:           'rgb(255, 255, 255)',
      })
    })
  })
})
