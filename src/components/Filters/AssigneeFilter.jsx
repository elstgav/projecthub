import React        from 'react'
import PropTypes    from 'prop-types'
import { isEmpty }  from 'lodash'

import { User }     from 'src/models'

import SelectButton from 'components/SelectButton'
import BaseFilter   from 'components/Filters/BaseFilter'


export default class AssigneeFilter extends BaseFilter {
  static CACHE_KEY = 'assignee-filter'

  static ALL_ASSIGNEES = { id: '@all',        val: 'All'        }
  static UNASSIGNED    = { id: '@unassigned', val: 'Unassigned' }

  static propTypes = {
    ...BaseFilter.propTypes,

    assignees: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    onChange:  PropTypes.func.isRequired,
  }

  static defaultState = {
    selectedAssignee: AssigneeFilter.ALL_ASSIGNEES,
  }

  onChange = (assignee) => {
    this.setState({
      selectedAssignee: assignee,
    }, this.props.onChange)
  }

  shouldDisplayCard(card) {
    const assignees = JSON.parse(card.dataset.cardAssignee || '[]')

    switch (this.state.selectedAssignee.id) {
      case AssigneeFilter.ALL_ASSIGNEES.id:
        return true

      case AssigneeFilter.UNASSIGNED.id:
        return isEmpty(assignees)

      default:
        return assignees.includes(this.state.selectedAssignee.login.toLowerCase())
    }
  }

  render() {
    const assigneeOptions = [
      AssigneeFilter.ALL_ASSIGNEES,
      AssigneeFilter.UNASSIGNED,
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
