import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon   from 'components/Icon'

import OptionVal from './OptionVal'


export default class Option extends React.Component {
  static defaultProps = {
    isSelected: false,
  }

  static propTypes = {
    isSelected: PropTypes.bool,
    onClick:    PropTypes.func.isRequired,
    option:     PropTypes.shape(OptionVal.propTypes.option).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { isHovered: false }
  }

  onMouseEnter = () => this.setState({ isHovered: true  })
  onMouseLeave = () => this.setState({ isHovered: false })

  onClick = () => {
    this.props.onClick(this.props.option)
  }

  render() {
    const optionClassNames = classNames('select-menu-item projecthub-option', {
      selected:           this.props.isSelected,
      'navigation-focus': this.state.isHovered,
    })

    return (
      <li
        aria-selected={this.props.isSelected}
        className={optionClassNames}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        role="option"
      >
        <button type="button" className="projecthub-semantic-btn" onClick={this.onClick}>
          <Icon icon="check" className="select-menu-item-icon" width="12" />
          <OptionVal option={this.props.option} />
        </button>
      </li>
    )
  }
}
