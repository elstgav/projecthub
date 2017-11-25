import React from 'react'
import PropTypes from 'prop-types'

import { User } from 'src/models'

export default class Avatar extends React.PureComponent {
  static propTypes = {
    user: PropTypes.instanceOf(User).isRequired,
    size: PropTypes.number,
  }

  static defaultProps = {
    size: 20,
  }

  render = () => (
    <img
      alt={`@${this.props.user.login}`}
      className="avatar"
      height={this.props.size}
      width={this.props.size}
      src={this.props.user.avatar}
    />
  )
}
