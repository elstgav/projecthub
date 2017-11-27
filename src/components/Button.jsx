import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


const Button = ({ isActive, children, ...props }) => (
  <button
    {...props}
    className={classNames('btn btn-default', { selected: isActive }, props.className)}
  >
    {children}
  </button>
)

Button.propTypes = {
  isActive:  PropTypes.bool,
  children:  PropTypes.node.isRequired,
  className: PropTypes.string,
}

Button.defaultProps = {
  isActive:  false,
  className: '',
}

export default Button
