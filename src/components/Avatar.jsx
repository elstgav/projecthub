import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { User } from 'src/models'

export default class Avatar extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    user:      PropTypes.instanceOf(User).isRequired,
    size:      PropTypes.number,
  }

  static defaultProps = {
    className: null,
    size:      20,
  }

  render = () => (
    <img
      alt={`@${this.props.user.login}`}
      className={classNames('avatar', this.props.className)}
      height={this.props.size}
      width={this.props.size}
      src={this.props.user.avatar}
    />
  )
}
