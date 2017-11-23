import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { User } from 'src/models'

import SelectButton from 'components/SelectButton'
import BaseFilter from 'components/Filters/BaseFilter'

const ALL_ASSIGNEES    = { id: '@all',        val: 'All'        }
const UNASSIGNED       = { id: '@unassigned', val: 'Unassigned' }

export default class AssigneeFilter extends BaseFilter {
  static propTypes = {
    ...BaseFilter.propTypes,

    assignees: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    onChange:  PropTypes.func.isRequired,
  }

  static defaultState = {
    selectedAssignee: ALL_ASSIGNEES,
  }

  onChange = (assignee) => {
    this.setState({
      selectedAssignee: assignee,
    }, this.props.onChange)
  }

  hydrateCachedState(cachedState) {
    const hydratedState = super.hydrateCachedState(cachedState)
    if (isEmpty(hydratedState)) return hydratedState
    if (hydratedState.selectedAssignee.id.startsWith('@')) return hydratedState

    hydratedState.selectedAssignee = new User(cachedState.selectedAssignee)

    return hydratedState
  }

  shouldDisplayCard(card) {
    const assignees = JSON.parse(card.dataset.cardAssignee || '[]')

    if (this.state.selectedAssignee.id === ALL_ASSIGNEES.id) return true
    if (this.state.selectedAssignee.id === UNASSIGNED.id)    return isEmpty(assignees)

    return assignees.includes(this.state.selectedAssignee.login.toLowerCase())
  }


  render() {
    const assigneeOptions = [
      ALL_ASSIGNEES,
      UNASSIGNED,
      ...this.props.assignees,
    ]

    return (
      <SelectButton
        className="mr-2"
        type="Assignee"
        options={assigneeOptions}
        onChange={this.onChange}
        initialSelection={this.state.selectedAssignee}
      />
    )
  }
}
