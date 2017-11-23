import React     from 'react'
import PropTypes from 'prop-types'
import { pick }  from 'lodash'

import { Label, User } from 'src/models'

import Avatar from 'src/components/Avatar'


const OptionVal = ({ option }) => {
  switch (option.constructor) {
    case Label:
      return (
        <div className="label-select-menu select-menu-item-text css-truncate">
          <div className="color-label-wrapper css-truncate-target">
            <span className="color" style={pick(option.style, ['backgroundColor'])}>&nbsp;</span>
            &nbsp;
            <span className="name">{option.val}</span>
          </div>
        </div>
      )

    case User:
      return (
        <div>
          <div className="select-menu-item-gravatar"><Avatar user={option} size={30} /></div>
          <div className="select-menu-item-text">
            {option.name}
            {option.login !== option.name && (
              <span className="description-inline"> {option.login}</span>
            )}
          </div>
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
    PropTypes.instanceOf(Label),
    PropTypes.instanceOf(User),
  ]).isRequired,
}

export default OptionVal
