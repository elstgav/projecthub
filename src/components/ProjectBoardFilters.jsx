import React from 'react'

import { App } from 'src/models'

import { show, hide } from 'src/utils'

import {
  AssigneeFilter,
  FocusFilter,
} from 'components/Filters'


export default class ProjectBoardFilters extends React.Component {
  static filterItems(items, itemFilters) {
    items.forEach((item) => {
      const shouldShowItem = itemFilters.every(showsItem => showsItem(item))

      shouldShowItem ? show(item) : hide(item)
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      assignees:     App.assignees,
      cardFilters:   [],
      columnFilters: [],
    }

    App.afterBoardLoaded.then(() => {
      this.setState({ assignees: App.assignees })
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
      <div>
        <FocusFilter
          addCardsFilter={this.onCardsFilterAdded}
          addColumnsFilter={this.onColumnsFilterAdded}
          onChange={this.onFiltersChanged}
        />
        <AssigneeFilter
          assignees={this.state.assignees}
          addCardsFilter={this.onCardsFilterAdded}
          addColumnsFilter={this.onColumnsFilterAdded}
          onChange={this.onFiltersChanged}
        />
      </div>
    )
  }
}
