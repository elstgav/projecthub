import React        from 'react'
import PropTypes    from 'prop-types'
import { isEmpty }  from 'lodash'

import { Label }    from 'src/models'

import SelectButton from 'components/SelectButton'
import BaseFilter   from 'components/Filters/BaseFilter'

export default class LabelFilter extends BaseFilter {
  static ALL_LABELS = { id: '@all',       val: 'All'       }
  static UNLABELED  = { id: '@unlabeled', val: 'Unlabeled' }

  static propTypes = {
    ...BaseFilter.propTypes,

    labels:   PropTypes.arrayOf(PropTypes.instanceOf(Label)),
    onChange: PropTypes.func.isRequired,
  }

  static defaultState = {
    selectedLabel: LabelFilter.ALL_LABELS,
  }

  onChange = (label) => {
    this.setState({
      selectedLabel: label,
    }, this.props.onChange)
  }

  hydrateCachedState(cachedState) {
    const hydratedState = super.hydrateCachedState(cachedState)
    if (isEmpty(hydratedState)) return hydratedState
    if (hydratedState.selectedAssignee.id.startsWith('@')) return hydratedState

    hydratedState.selectedLabel = new Label(cachedState.selectedLabel)

    return hydratedState
  }

  shouldDisplayCard(card) {
    const labels = JSON.parse(card.dataset.cardLabel || '[]')

    if (this.state.selectedLabel.id === LabelFilter.ALL_LABELS.id) return true
    if (this.state.selectedLabel.id === LabelFilter.UNLABELED.id)  return isEmpty(labels)

    return labels.includes(this.state.selectedLabel.val.toLowerCase())
  }

  render() {
    const labelOptions = [
      LabelFilter.ALL_LABELS,
      LabelFilter.UNLABELED,
      ...this.props.labels,
    ]

    return (
      <SelectButton
        className="mr-2"
        type="Label"
        options={labelOptions}
        onChange={this.onChange}
        initialSelection={this.state.selectedLabel}
      />
    )
  }
}
