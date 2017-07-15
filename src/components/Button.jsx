import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ active, children, ...props }) => (
  <button
    {...props}
    className={`btn btn-default ${active ? 'selected' : ''} ${props.className}`}
  >
    {children}
  </button>
)

Button.propTypes = {
  active:    PropTypes.bool,
  children:  PropTypes.node.isRequired,
  className: PropTypes.string,
}

Button.defaultProps = {
  active:    false,
  className: '',
}

export default Button
