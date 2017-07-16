const App = {
  namespace:   'gpf',

  currentUser:  document.getElementsByName('octolytics-actor-login')[0].content,
  projectBoard: document.querySelector('.project-columns-container'),

  get afterBoardLoaded() {
    const afterBoardLoaded = new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const finishedLoading = this.projectBoard.querySelector('include-fragment') === null

        if (finishedLoading) {
          resolve()
          observer.disconnect()
        }
      })

      observer.observe(this.projectBoard, { childList: true, subtree: true })
    })

    // Memoize
    delete this.afterBoardLoaded
    this.afterBoardLoaded = afterBoardLoaded

    return afterBoardLoaded
  },

  get hiddenClass() {
    return `${this.namespace}-is-hidden`
  },

  get cards() {
    return Array.from(this.projectBoard.querySelectorAll('.issue-card'))
  },

  get columns() {
    return Array.from(this.projectBoard.querySelectorAll('.project-column'))
  },
}

export default App
