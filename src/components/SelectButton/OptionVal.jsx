import React from 'react'
import PropTypes from 'prop-types'

import { User } from 'src/models'

import Avatar from 'src/components/Avatar'


const OptionVal = ({ option }) => {
  switch (option.constructor.name) {
    case 'User':
      return (
        <div>
          <div className="select-menu-item-gravatar"><Avatar user={option} size={30} /></div>
          <div className="select-menu-item-text">{option.login}</div>
        </div>
      )
    default:
      return (
        <div className="select-menu-item-text">{option.val}</div>
      )
  }
}

OptionVal.propTypes = {
  option: PropTypes.oneOfType([
    PropTypes.shape({ id: PropTypes.string, val: PropTypes.string }),
    PropTypes.instanceOf(User),
  ]).isRequired,
}

export default OptionVal
