import React from 'react'
import PropTypes from 'prop-types'

import Icon   from 'components/Icon'

export default class Option extends React.Component {
  static defaultProps = {
    id:       null,
    selected: false,
    onClick: () => {},
  }

  static propTypes = {
    id:       PropTypes.string,
    val:      PropTypes.string.isRequired,
    onClick:  PropTypes.func,
    selected: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = { isHovered: false }
  }

  onMouseEnter = () => this.setState({ isHovered: true  })
  onMouseLeave = () => this.setState({ isHovered: false })

  onClick = () => {
    this.props.onClick(this.props.id)
  }

  render() {
    return (
      <li
        aria-selected={this.props.selected}
        className={`select-menu-item ${this.props.selected && 'selected'} ${this.state.isHovered && 'navigation-focus'}`}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        role="option"
      >
        <Icon icon="check" className="select-menu-item-icon" />
        <span className="select-menu-item-text">{this.props.val}</span>
      </li>
    )
  }
}
