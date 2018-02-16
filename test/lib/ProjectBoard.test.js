import { oneLine } from 'common-tags'

import { Label, User } from 'src/models'
import { App, ProjectBoard, Storage } from 'src/lib'

describe('ProjectBoard', () => {
  beforeEach(() => {
    ProjectBoard.CACHE_KEY = 'testProjectBoard'
  })

  afterEach(() => {
    ProjectBoard.__memoized__.clear() // eslint-disable-line no-underscore-dangle
  })

  describe('.isEditable', () => {
    it('returns true if “Add cards” link is present', () => {
      document.body.innerHTML = '<a class="project-header-link" aria-label="Toggle add cards to project"></a>'
      expect(ProjectBoard.isEditable).toBe(true)
    })

    it('returns false if “Add cards” link is not present', () => {
      expect(ProjectBoard.isEditable).toBe(false)
    })
  })

  describe('.container', () => {
    it('returns the .project-columns-container element', () => {
      document.body.innerHTML = '<div class="project-columns-container"></div>'
      const container = document.querySelector('.project-columns-container')
      expect(ProjectBoard.container).toBe(container)
    })
  })

  describe('.afterLoaded', () => {
    it('returns ', () => {
      expect.assertions(1)

      document.body.innerHTML = '<div class="project-columns-container"><include-fragment /></div>'

      const promise = ProjectBoard.afterLoaded.then(() => {
        expect(ProjectBoard.container.textContent).toBe('Loaded!')
      })

      ProjectBoard.container.innerHTML = 'Loaded!'

      return promise
    })
  })

  describe('.newColumnButton', () => {
    it('returns the .js-new-column-button element', () => {
      document.body.innerHTML = oneLine`
        <div class="project-columns-container">
          <div class="js-new-project-column-container">
            <div class="js-new-column-button"></div>
          </div>
        </div>
      `
      const button = document.querySelector('.js-new-column-button')
      expect(ProjectBoard.newColumnButton).toBe(button)
    })
  })

  describe('.cards', () => {
    it('returns all .issue-card elements in the project', () => {
      document.body.innerHTML = oneLine`
        <div class="project-columns-container">
          <div class="issue-card"></div>
          <div class="issue-card"></div>
          <div class="issue-card"></div>
        </div>
        <div class="issue-card"></div>
      `
      expect(ProjectBoard.cards.length).toBe(3)
    })
  })

  describe('.columns', () => {
    it('returns all .project-column elements in the project', () => {
      document.body.innerHTML = oneLine`
        <div class="project-columns-container">
          <div class="project-column"></div>
          <div class="project-column"></div>
          <div class="project-column"></div>
        </div>
        <div class="project-column"></div>
      `
      expect(ProjectBoard.columns.length).toBe(3)
    })
  })

  describe('.assignees', () => {
    it('returns all assignees found in the project', () => {
      document.body.innerHTML = oneLine`
        <div class="project-columns-container">
          <div class="avatar"><img alt="@test1" src="foo.com/u/1?s=40&v=4"></div>
          <div class="avatar"><img alt="@test2" src="foo.com/u/2?s=40&v=4"></div>
          <div class="avatar"><img alt="@test3" src="foo.com/u/3?s=40&v=4"></div>
        </div>
        <div class="avatar">
          <img alt="@test4" src="https://avatars3.githubusercontent.com/u/4?s=40&v=4">
        </div>
      `
      const assignees = ProjectBoard.assignees
      expect(assignees.length).toBe(3)

      assignees.forEach((assignee, i) => {
        expect(assignee).toBeInstanceOf(User)
        expect(assignee.login).toBe(`test${i + 1}`)
      })
    })

    it('returns an empty array if no assignees found', () => {
      document.body.innerHTML = '<div class="project-columns-container"></div>'
      expect(ProjectBoard.assignees).toEqual([])
    })
  })

  describe('.labels', () => {
    it('returns all labels found in the project', () => {
      document.body.innerHTML = oneLine`
        <div class="project-columns-container">
          <div class="issue-card-label" style="background-color: #000; color: #fff;">Label 1</div>
          <div class="issue-card-label" style="background-color: #000; color: #fff;">Label 2</div>
          <div class="issue-card-label" style="background-color: #000; color: #fff;">Label 3</div>
        </div>
        <div class="issue-card-label" style="background-color: #000; color: #fff;">Label 4</div>
      `
      const labels = ProjectBoard.labels
      expect(labels.length).toBe(3)

      labels.forEach((label, i) => {
        expect(label).toBeInstanceOf(Label)
        expect(label.val).toBe(`Label ${i + 1}`)
      })
    })

    it('returns an empty array if no labels found', () => {
      document.body.innerHTML = '<div class="project-columns-container"></div>'
      expect(ProjectBoard.labels).toEqual([])
    })
  })

  describe('.shouldHideNewColumnButton', () => {
    it('returns false on initial load', async () => {
      expect(await ProjectBoard.shouldHideNewColumnButton()).toBe(false)
    })

    it('returns true depending on storage state', async () => {
      await Storage.set({ testProjectBoard: { hideNewColumnButton: true } })
      expect(await ProjectBoard.shouldHideNewColumnButton()).toBe(true)
    })

    it('returns false depending on storage state', async () => {
      await Storage.set({ testProjectBoard: { hideNewColumnButton: false } })
      expect(await ProjectBoard.shouldHideNewColumnButton()).toBe(false)
    })
  })

  describe('.init()', () => {
    const renderNewColumnButton = ProjectBoard.renderNewColumnButton

    beforeEach(() => {
      document.body.innerHTML = '<div class="project-columns-container"><include-fragment /></div>'
      ProjectBoard.renderNewColumnButton = jest.fn()
    })

    afterEach(() => {
      ProjectBoard.renderNewColumnButton = renderNewColumnButton
    })

    it('renders the new column button after the board has loaded', () => {
      expect.assertions(1)

      const promise = ProjectBoard.init().then(() => {
        expect(ProjectBoard.renderNewColumnButton).toHaveBeenCalled()
      })

      ProjectBoard.container.innerHTML = 'Loaded!'

      return promise
    })
  })

  describe('.toggleNewColumnButton()', () => {
    beforeEach(() => {
      document.body.innerHTML = oneLine`
        <div class="project-columns-container">
          <div class="js-new-project-column-container">
            <div class="js-new-column-button"></div>
          </div>
        </div>
      `
    })

    it('does nothing if there’s no “new column” button', async () => {
      ProjectBoard.container.innerHTML = ''
      expect(await ProjectBoard.toggleNewColumnButton()).toBeUndefined()
    })

    it('hides the “new column” button initially', async () => {
      await ProjectBoard.toggleNewColumnButton()
      expect(ProjectBoard.newColumnButton.classList).toContain(App.hiddenClass)
    })

    it('hides the “new column” button if previously shown', async () => {
      ProjectBoard.newColumnButton.classList.add(App.hiddenClass)
      await Storage.set({ testProjectBoard: { hideNewColumnButton: true } })
      await ProjectBoard.toggleNewColumnButton()
      expect(ProjectBoard.newColumnButton.classList).not.toContain(App.hiddenClass)
    })

    it('shows the “new column” button if previously hidden', async () => {
      await Storage.set({ testProjectBoard: { hideNewColumnButton: false } })
      await ProjectBoard.toggleNewColumnButton()
      expect(ProjectBoard.newColumnButton.classList).toContain(App.hiddenClass)
    })
  })

  describe('.renderNewColumnButton()', () => {
    beforeEach(() => {
      document.body.innerHTML = oneLine`
        <div class="project-columns-container">
          <div class="js-new-project-column-container">
            <div class="js-new-column-button"></div>
          </div>
        </div>
      `
    })

    it('does nothing if there’s no “new column” button', async () => {
      ProjectBoard.container.innerHTML = ''
      expect(await ProjectBoard.renderNewColumnButton()).toBeUndefined()
    })

    it('hides the “new column” button depending on storag state', async () => {
      await Storage.set({ testProjectBoard: { hideNewColumnButton: true } })
      await ProjectBoard.renderNewColumnButton()
      expect(ProjectBoard.newColumnButton.classList).toContain(App.hiddenClass)
    })

    it('shows the “new column” button depending on storag state', async () => {
      ProjectBoard.newColumnButton.classList.add(App.hiddenClass)

      await Storage.set({ testProjectBoard: { hideNewColumnButton: false } })
      await ProjectBoard.renderNewColumnButton()
      expect(ProjectBoard.newColumnButton.classList).not.toContain(App.hiddenClass)
    })
  })
})
