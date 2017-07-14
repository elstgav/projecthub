import React from 'react'
import Focus from './Focus'
import { show, hide } from '../utils'

const currentUser = document.getElementsByName('octolytics-actor-login')[0].content
const project     = document.querySelector('.project-columns-container')

export default class ProjectBoardFilters extends React.Component {
  static toggleVisibility(itemSelector, itemFilters) {
    const items = Array.from(project.querySelectorAll(itemSelector))

    items.forEach((item) => {
      const filteredItems  = itemFilters.filter(itemFilter => itemFilter(item))
      const shouldShowItem = filteredItems.length > 0

      shouldShowItem ? show(item) : hide(item)
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      cardFilters:   [],
      columnFilters: [],
    }

    this.onBoardLoaded(this.renderBoard)
  }


  onBoardLoaded = (callback) => {
    const observer = new MutationObserver(() => {
      const finishedLoading = project.querySelector('include-fragment') === null

      if (finishedLoading) {
        callback.call(this)
        observer.disconnect()
      }
    })

    observer.observe(project, { childList: true, subtree: true })
  }

  onCardsFilterAdded = (cardFilter) => {
    this.setState({
      cardFilters: [...this.state.cardFilters, cardFilter],
    })
  }

  onColumnsFilterAdded = (columnFilter) => {
    this.setState({
      columnFilters: [...this.state.columnFilters, columnFilter],
    })
  }

  onFiltersChanged = () => {
    this.renderBoard()
  }

  renderBoard() {
    this.renderCards()
    this.renderColumns()
  }

  renderCards() {
    ProjectBoardFilters.toggleVisibility('.issue-card', this.state.cardFilters)
  }

  renderColumns() {
    ProjectBoardFilters.toggleVisibility('.project-column', this.state.columnFilters)
  }

  render() {
    return (
      <Focus
        currentUser={currentUser}
        addCardsFilter={this.onCardsFilterAdded}
        addColumnsFilter={this.onColumnsFilterAdded}
        onChange={this.onFiltersChanged}
      />
    )
  }
}
