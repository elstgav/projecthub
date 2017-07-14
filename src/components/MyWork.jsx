import React from 'react'
import { show, hide } from '../utils'

const sessionKey = 'gpf-state'

export default class MyWork extends React.Component {
  static initialState = {
    toggled: false,
  }

  constructor(props) {
    super(props)

    this.currentUser = document.getElementsByName('octolytics-actor-login')[0].content
    this.project     = document.querySelector('.project-columns-container')

    this.state = JSON.parse(sessionStorage.getItem(sessionKey)) || MyWork.initialState

    this.onCardsLoaded(this.renderCards)
  }


  onCardsLoaded = (callback) => {
    const observer = new MutationObserver(() => {
      const loadingIndicator = this.project.querySelector('include-fragment')

      if (!loadingIndicator) {
        callback.call(this)
        observer.disconnect()
      }
    })

    observer.observe(this.project, { childList: true, subtree: true })
  }

  onToggle = () => {
    this.setState({
      toggled: !this.state.toggled,
    }, this.renderCards)
  }


  setState(stateObject, callback) {
    super.setState(stateObject, callback)
    sessionStorage.setItem(sessionKey, JSON.stringify(stateObject))
  }

  filterCards() {
    const notMyCards = this.cards().filter((card) => {
      const assignees = JSON.parse(card.dataset.cardAssignee || '[]')
      return assignees.length > 0 && !assignees.includes(this.currentUser)
    })

    hide(this.backlog())
    notMyCards.forEach(card => hide(card))
  }

  resetCards() {
    show(this.backlog())
    this.cards().forEach(card => show(card))
  }

  backlog() {
    return this.project.querySelector('.project-column[data-id="1239586"]')
  }

  cards() {
    return Array.from(this.project.querySelectorAll('.issue-card'))
  }

  renderCards() {
    this.state.toggled ? this.filterCards() : this.resetCards()
  }

  render() {
    return (
      <button
        className={`btn btn-default ${this.state.toggled ? 'selected' : ''}`}
        onClick={this.onToggle}
      >
        My Work
      </button>
    )
  }
}
