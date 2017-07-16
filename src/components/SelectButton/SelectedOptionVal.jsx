import React from 'react'

import OptionVal from './OptionVal'

const SelectedOptionVal = ({ option }) => {
  switch (option.constructor.name) {
    case 'User':
      return <span>{option.login}</span>
    default:
      return <span>{option.val}</span>
  }
}

SelectedOptionVal.propTypes = OptionVal.propTypes

export default SelectedOptionVal
