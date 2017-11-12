import React from 'react'

import OptionVal from './OptionVal'

const SelectedOptionVal = ({ option }) => {
  let value

  switch (option.constructor.name) {
    case 'User':
      value = option.name.split(' ')[0]
      break

    default:
      value = option.val
  }

  return <span className="css-truncate-target">{value}</span>
}

SelectedOptionVal.propTypes = OptionVal.propTypes

export default SelectedOptionVal
