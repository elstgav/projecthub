import React     from 'react'
import PropTypes from 'prop-types'
import { pick }  from 'lodash'

import { Label, User } from 'src/models'
import { Aux } from 'src/utils'

import Avatar from 'components/Avatar'

/* eslint-disable react/no-multi-comp */


export default class OptionVal extends React.PureComponent {
  static propTypes = {
    option: PropTypes.oneOfType([
      PropTypes.shape({ id: PropTypes.string, val: PropTypes.string }),
      PropTypes.instanceOf(Label),
      PropTypes.instanceOf(User),
    ]).isRequired,
  }

  render() {
    switch (this.props.option.constructor) {
      case Label:
        return <LabelOption label={this.props.option} />

      case User:
        return <UserOption user={this.props.option} />

      default:
        return <div className="select-menu-item-text">{this.props.option.val}</div>
    }
  }
}

class LabelOption extends React.PureComponent {
  static propTypes = { label: PropTypes.instanceOf(Label).isRequired }

  render = () => (
    <div className="label-select-menu select-menu-item-text css-truncate">
      <div className="color-label-wrapper css-truncate-target">
        <span className="color" style={pick(this.props.label.style, ['backgroundColor'])}>
          &nbsp;
        </span>
        &nbsp;
        <span className="name">{this.props.label.val}</span>
      </div>
    </div>
  )
}

class UserOption extends React.PureComponent {
  static propTypes = { user: PropTypes.instanceOf(User).isRequired }

  render = () => (
    <Aux>
      <div className="select-menu-item-gravatar">
        <Avatar user={this.props.user} size={30} />
      </div>
      <div className="select-menu-item-text">
        {this.props.user.name}
        {this.props.user.login !== this.props.user.name && (
          <span className="description-inline"> {this.props.user.login}</span>
        )}
      </div>
    </Aux>
  )
}
