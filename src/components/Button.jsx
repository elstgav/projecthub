import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ isActive, children, ...props }) => (
  <button
    {...props}
    className={`btn btn-default ${isActive ? 'selected' : ''} ${props.className}`}
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
