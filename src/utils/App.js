const App = {
  hiddenClass: 'gpf-is-hidden',

  currentUser:  document.getElementsByName('octolytics-actor-login')[0].content,
  projectBoard: document.querySelector('.project-columns-container'),

  show(el) {
    el.classList.remove(this.hiddenClass)
  },

  hide(el) {
    el.classList.add(this.hiddenClass)
  },

  onBoardLoaded(callback) {
    const observer = new MutationObserver(() => {
      const finishedLoading = this.projectBoard.querySelector('include-fragment') === null

      if (finishedLoading) {
        callback()
        observer.disconnect()
      }
    })

    observer.observe(this.projectBoard, { childList: true, subtree: true })
  },
}

export default App