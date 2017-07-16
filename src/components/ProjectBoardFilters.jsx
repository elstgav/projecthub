import React from 'react'

import { App } from 'src/models'

import { show, hide } from 'src/utils'

import {
  FocusFilter,
} from 'components/Filters'


export default class ProjectBoardFilters extends React.Component {
  static filterItems(items, itemFilters) {
    items.forEach((item) => {
      const itemsToHide    = itemFilters.filter(showItem => !showItem(item))
      const shouldHideItem = itemsToHide.length > 0

      shouldHideItem ? hide(item) : show(item)
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      cardFilters:   [],
      columnFilters: [],
    }

    App.afterBoardLoaded.then(() => {
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
    ProjectBoardFilters.filterItems(App.cards, this.state.cardFilters)
  }

  renderColumns() {
    ProjectBoardFilters.filterItems(App.columns, this.state.columnFilters)
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
