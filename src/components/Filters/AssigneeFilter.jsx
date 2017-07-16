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

  onChange = (id) => {
    let selection = this.props.assignees.find(assignee => assignee.id === id)
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
    const assigneeOptions = [
      { id: null, val: 'All' },

      ...this.props.assignees,
    ]

    const selected = assigneeOptions.find(assignee => assignee === this.state.selectedAssignee)

    return (
      <SelectButton
        className="mr-2"
        type="Assignee"
        options={assigneeOptions}
        onChange={this.onChange}
        selected={selected}
      />
    )
  }
}
