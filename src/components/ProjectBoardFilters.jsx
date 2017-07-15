import React from 'react'

import { App } from 'src/utils'

import {
  FocusFilter,
} from 'components/Filters'


export default class ProjectBoardFilters extends React.Component {
  static filterItems(itemSelector, itemFilters) {
    const items = Array.from(App.projectBoard.querySelectorAll(itemSelector))

    items.forEach((item) => {
      const itemsToHide    = itemFilters.filter(showItem => !showItem(item))
      const shouldHideItem = itemsToHide.length > 0

      shouldHideItem ? App.hide(item) : App.show(item)
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      cardFilters:   [],
      columnFilters: [],
    }

    App.onBoardLoaded(() => {
      this.renderBoard()
    })
  }

  onCardsFilterAdded = (cardFilter) => {
    this.setState(prevState => (
      { cardFilters: [...prevState.cardFilters, cardFilter] }
    ))
  }

  onColumnsFilterAdded = (columnFilter) => {
    this.setState(prevState => (
      { columnFilters: [...prevState.columnFilters, columnFilter] }
    ))
  }

  onFiltersChanged = () => {
    this.renderBoard()
  }

  renderCards() {
    ProjectBoardFilters.filterItems('.issue-card', this.state.cardFilters)
  }

  renderColumns() {
    ProjectBoardFilters.filterItems('.project-column', this.state.columnFilters)
  }

  renderBoard() {
    this.renderCards()
    this.renderColumns()
  }


  render() {
    return (
      <FocusFilter
        addCardsFilter={this.onCardsFilterAdded}
        addColumnsFilter={this.onColumnsFilterAdded}
        onChange={this.onFiltersChanged}
      />
    )
  }
}
