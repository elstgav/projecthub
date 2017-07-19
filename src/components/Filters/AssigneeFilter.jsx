import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { User } from 'src/models'

import SelectButton from 'components/SelectButton'
import BaseFilter from 'components/Filters/BaseFilter'

const UNASSIGNED_ID = '@unassigned'

export default class AssigneeFilter extends BaseFilter {
  static propTypes = {
    ...BaseFilter.propTypes,

    assignees: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    onChange:  PropTypes.func.isRequired,
  }

  static defaultState = {
    selectedAssignee: { id: null, val: 'All' },
  }

  onChange = (assignee) => {
    this.setState({
      selectedAssignee: assignee,
    }, this.props.onChange)
  }

  shouldDisplayCard(card) {
    if (!this.state.selectedAssignee.id) return true

    const assignees = JSON.parse(card.dataset.cardAssignee || '[]')

    if (this.state.selectedAssignee.id === UNASSIGNED_ID) return isEmpty(assignees)
    return assignees.includes(this.state.selectedAssignee.login.toLowerCase())
  }


  render() {
    const assigneeOptions = [
      AssigneeFilter.defaultState.selectedAssignee,
      { id: UNASSIGNED_ID, val: 'Unassigned' },
      ...this.props.assignees,
    ]

    return (
      <SelectButton
        className="mr-2"
        type="Assignee"
        options={assigneeOptions}
        onChange={this.onChange}
        selected={this.state.selectedAssignee}
      />
    )
  }
}
