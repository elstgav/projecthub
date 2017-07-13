import React from 'react'
import ReactDOM from 'react-dom'
import { show, hide } from './utils'

class Filter extends React.Component {
  constructor(props) {
    super(props)

    this.user = document.getElementsByName('octolytics-actor-login')[0].content
    this.project = document.querySelector('.project-columns-container')

    this.state = {
      toggled: false,
    }
  }

  onToggle = () => {
    this.setState({ toggled: !this.state.toggled }, () => {
      this.state.toggled ? this.setFilter() : this.resetFilters()
    })
  }

  setFilter() {
    const notMyCards = this.cards().filter((card) => {
      const assignees = JSON.parse(card.dataset.cardAssignee || '[]')
      return assignees.length > 0 && !assignees.includes(this.user)
    })

    hide(this.backlog())
    notMyCards.forEach(card => hide(card))
  }

  resetFilters() {
    show(this.backlog())
    this.cards().forEach(card => show(card))
  }

  backlog() {
    return this.project.querySelector('.project-column[data-id="1239586"]')
  }

  cards() {
    return Array.from(this.project.querySelectorAll('.issue-card'))
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

const sandbox = document.createElement('div')
document.querySelector('.project-header').children[2].prepend(sandbox)
ReactDOM.render(<Filter />, sandbox)
