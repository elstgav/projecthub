import React from 'react'
import PropTypes from 'prop-types'

const paths = {
  x:     'M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z',
  check: 'M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z',
}

const Icon = props => (
  <svg
    aria-hidden={!props.ariaLabel}
    aria-label={props.ariaLabel}
    className={`octicon octicon-${props.icon} ${props.className}`}
    height={props.height}
    width={props.width}
    role="img"
    version="1.1"
    viewBox="0 0 12 16"
  >
    <path fillRule="evenodd" d={paths[props.icon]} />
  </svg>
)

Icon.propTypes = {
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  icon:      PropTypes.string.isRequired,
  height:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width:     PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Icon.defaultProps = {
  ariaLabel: '',
  className: '',
  height:    16,
  width:     16,
}

export default Icon
