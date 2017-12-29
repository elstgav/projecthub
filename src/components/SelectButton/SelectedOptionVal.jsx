import React from 'react'

import { User } from 'src/models'

import OptionVal from './OptionVal'

const SelectedOptionVal = ({ option }) => {
  let value

  switch (option.constructor) {
    case User:
      [value] = option.name.split(' ')
      break

    default:
      value = option.val
  }

  return <span className="css-truncate-target">{value}</span>
}

SelectedOptionVal.propTypes = OptionVal.propTypes

export default SelectedOptionVal
