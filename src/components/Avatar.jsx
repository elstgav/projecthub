import React from 'react'
import PropTypes from 'prop-types'

import { User } from 'src/models'


const Avatar = ({ user, size }) => (
  <img
    alt={`@${user.login}`}
    className="avatar"
    height={size}
    width={size}
    src={user.avatar}
  />
)

Avatar.propTypes = {
  user: PropTypes.instanceOf(User).isRequired,
  size: PropTypes.number,
}

Avatar.defaultProps = {
  size: 20,
}

export default Avatar
