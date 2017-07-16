import React from 'react'
import PropTypes from 'prop-types'

import { Label } from 'src/models'

import SelectButton from 'components/SelectButton'
import BaseFilter from 'components/Filters/BaseFilter'

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
    return labels.includes(this.state.selectedLabel.val.toLowerCase())
  }


  render() {
    const labelOptions = [
      LabelFilter.defaultState.selectedLabel,

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
