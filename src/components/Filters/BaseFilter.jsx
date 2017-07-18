import React from 'react'
import PropTypes from 'prop-types'

import { Session } from 'src/models'

export default class Filter extends React.Component {
  static propTypes = {
    addCardsFilter:   PropTypes.func.isRequired,
    addColumnsFilter: PropTypes.func.isRequired,
  }

  static defaultState = {}

  constructor(props) {
    super(props)

    this.state = Session.get(this.sessionKey()) || this.constructor.defaultState
  }

  componentWillMount() {
    this.props.addCardsFilter(this.shouldDisplayCard.bind(this))
    this.props.addColumnsFilter(this.shouldDisplayColumn.bind(this))
  }

  setState(stateObject, callback = () => {}) {
    super.setState(stateObject, () => {
      Session.set(this.sessionKey(), this.state)
      callback()
    })
  }

  sessionKey = () => `state-${this.constructor.name}`

  /* eslint-disable class-methods-use-this */
  shouldDisplayCard(_card)     { return true }
  shouldDisplayColumn(_column) { return true }
  /* eslint-enable */
}
