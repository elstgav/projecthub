import React from 'react'
import Focus from './Focus'
import { show, hide } from '../utils'


export default class ProjectBoardFilters extends React.Component {
  static currentUser = document.getElementsByName('octolytics-actor-login')[0].content
  static project     = document.querySelector('.project-columns-container')

  static filters = {
    cardFilters:   [],
    columnFilters: [],
  }

  static toggleVisibility(itemSelector, itemFilters) {
    const items = Array.from(ProjectBoardFilters.project.querySelectorAll(itemSelector))

    items.forEach((item) => {
      const itemsToHide    = itemFilters.filter(showItem => !showItem(item))
      const shouldHideItem = itemsToHide.length > 0

      shouldHideItem ? hide(item) : show(item)
    })
  }

  static renderCards() {
    ProjectBoardFilters.toggleVisibility('.issue-card', ProjectBoardFilters.filters.cardFilters)
  }

  static renderColumns() {
    ProjectBoardFilters.toggleVisibility('.project-column', ProjectBoardFilters.filters.columnFilters)
  }

  static renderBoard() {
    ProjectBoardFilters.renderCards()
    ProjectBoardFilters.renderColumns()
  }

  static onBoardLoaded(callback) {
    const observer = new MutationObserver(() => {
      const finishedLoading = ProjectBoardFilters.project.querySelector('include-fragment') === null

      if (finishedLoading) {
        callback()
        observer.disconnect()
      }
    })
    observer.observe(ProjectBoardFilters.project, { childList: true, subtree: true })
  }

  static onCardsFilterAdded(cardFilter) {
    ProjectBoardFilters.filters.cardFilters.push(cardFilter)
  }

  static onColumnsFilterAdded(columnFilter) {
    ProjectBoardFilters.filters.columnFilters.push(columnFilter)
  }

  static onFiltersChanged() {
    ProjectBoardFilters.renderBoard()
  }


  constructor(props) {
    super(props)
    ProjectBoardFilters.onBoardLoaded(ProjectBoardFilters.renderBoard)
  }


  render() {
    return (
      <Focus
        currentUser={ProjectBoardFilters.currentUser}
        addCardsFilter={ProjectBoardFilters.onCardsFilterAdded}
        addColumnsFilter={ProjectBoardFilters.onColumnsFilterAdded}
        onChange={ProjectBoardFilters.onFiltersChanged}
        />
    )
  }
}
