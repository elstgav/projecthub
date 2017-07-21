import React from 'react'

import { ProjectBoard } from 'src/models'

import { show, hide } from 'src/utils'

import {
  AssigneeFilter,
  LabelFilter,
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
      assignees:     [],
      labels:        [],
      cardFilters:   [],
      columnFilters: [],
    }

    ProjectBoard.afterLoaded.then(() => {
      this.setState({
        assignees: ProjectBoard.assignees,
        labels:    ProjectBoard.labels,
      })

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
    ProjectBoardFilters.filterItems(ProjectBoard.cards, this.state.cardFilters)
  }

  renderColumns() {
    ProjectBoardFilters.filterItems(ProjectBoard.columns, this.state.columnFilters)
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
        <LabelFilter
          labels={this.state.labels}
          addCardsFilter={this.onCardsFilterAdded}
          addColumnsFilter={this.onColumnsFilterAdded}
          onChange={this.onFiltersChanged}
        />
      </div>
    )
  }
}
