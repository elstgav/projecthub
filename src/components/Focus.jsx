import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import Filter from './Filter'

export default class Focus extends Filter {
  static propTypes = {
    ...Filter.propTypes,

    currentUser:      PropTypes.string.isRequired,
    onChange:         PropTypes.func.isRequired,
  }

  static defaultState = {
    toggled: false,
  }

  onClick = () => {
    this.setState({
      toggled: !this.state.toggled,
    }, this.props.onChange)
  }

  shouldDisplayCard(card) {
    if (!this.state.toggled) return true

    const assignees = JSON.parse(card.dataset.cardAssignee || '[]')
    return assignees.length === 0 || assignees.includes(this.props.currentUser)
  }

  shouldDisplayColumn(column) {
    if (!this.state.toggled) return true
    return column.dataset.id !== '1239586' // Backlog column
  }

  render() {
    return (
      <Button active={this.state.toggled} onClick={this.onClick}>Focus</Button>
    )
  }
}
