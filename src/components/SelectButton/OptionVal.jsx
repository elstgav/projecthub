import React from 'react'
import PropTypes from 'prop-types'

const OptionVal = ({ option }) => (
  <div className="select-menu-item-text">{option.val}</div>
)

OptionVal.propTypes = {
  option: PropTypes.shape({ id: PropTypes.string, val: PropTypes.string }).isRequired,
}

export default OptionVal
