import React from 'react'
import PropTypes from 'prop-types'

import { User } from 'src/models'

import SelectButton from 'components/SelectButton'
import BaseFilter from 'components/Filters/BaseFilter'

export default class AssigneeFilter extends BaseFilter {
  static propTypes = {
    ...BaseFilter.propTypes,

    assignees: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    onChange:  PropTypes.func.isRequired,
  }

  static defaultState = {
    selectedAssignee: { login: null },
  }

  onChange = (login) => {
    let selection = this.props.assignees.find(assignee => assignee.login === login)
    if (!selection) selection = AssigneeFilter.defaultState.selectedAssignee

    this.setState({
      selectedAssignee: selection,
    }, this.props.onChange)
  }

  shouldDisplayCard(card) {
    if (!this.state.selectedAssignee.login) return true

    const assignees = JSON.parse(card.dataset.cardAssignee || '[]')
    return assignees.includes(this.state.selectedAssignee.login.toLowerCase())
  }

  render() {
    const assignees = [
      { id: null, val: 'All' },

      ...this.props.assignees.map(assignee => ({
        id:  assignee.login,
        val: assignee.login,
      })),
    ]

    const selected = assignees.find(assignee => assignee === this.state.selectedAssignee)

    return (
      <SelectButton
        className="mr-2"
        type="Assignee"
        options={assignees}
        onChange={this.onChange}
        selected={selected}
      />
    )
  }
}
