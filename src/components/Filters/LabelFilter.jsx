import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { Label } from 'src/models'

import SelectButton from 'components/SelectButton'
import BaseFilter from 'components/Filters/BaseFilter'

const NO_LABEL_ID = '@no_label'

export default class LabelFilter extends BaseFilter {
  static propTypes = {
    ...BaseFilter.propTypes,

    labels:   PropTypes.arrayOf(PropTypes.instanceOf(Label)),
    onChange: PropTypes.func.isRequired,
  }

  static defaultState = {
    selectedLabel: { id: null, val: 'All' },
  }

  onChange = (label) => {
    this.setState({
      selectedLabel: label,
    }, this.props.onChange)
  }

  shouldDisplayCard(card) {
    if (!this.state.selectedLabel.id) return true

    const labels = JSON.parse(card.dataset.cardLabel || '[]')
    if (this.state.selectedLabel.id === NO_LABEL_ID) return isEmpty(labels)

    return labels.includes(this.state.selectedLabel.val.toLowerCase())
  }


  render() {
    const labelOptions = [
      LabelFilter.defaultState.selectedLabel,
      { id: NO_LABEL_ID, val: 'None' },
      ...this.props.labels,
    ]

    return (
      <SelectButton
        className="mr-2"
        type="Label"
        options={labelOptions}
        onChange={this.onChange}
        selected={this.state.selectedLabel}
      />
    )
  }
}
