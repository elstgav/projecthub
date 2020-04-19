import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


export default class Button extends React.PureComponent {
  static propTypes = {
    isActive:  PropTypes.bool,
    children:  PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    isActive:  false,
    className: '',
  }

  render() {
    const { isActive, children, ...props } = this.props

    return (
      <button
        {...props}
        type="button"
        className={classNames('btn btn-default', { selected: isActive }, props.className)}
      >
        {children}
      </button>
    )
  }
}
