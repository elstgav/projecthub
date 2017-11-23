import React from 'react'
import PropTypes from 'prop-types'
import { clone } from 'lodash'

import { Session } from 'src/models'

export default class Filter extends React.Component {
  static propTypes = {
    addCardsFilter:   PropTypes.func.isRequired,
    addColumnsFilter: PropTypes.func.isRequired,
  }

  static defaultState = {}

  constructor(props) {
    super(props)

    const cachedState = this.hydrateCachedState(Session.get(this.sessionKey()))
    this.state = cachedState || this.constructor.defaultState
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

  /* eslint-disable class-methods-use-this */
  hydrateCachedState(cachedState) {
    return clone(cachedState)
  }
  /* eslint-enable */

  sessionKey = () => `state-${this.constructor.name}`

  /* eslint-disable class-methods-use-this */
  shouldDisplayCard(_card)     { return true }
  shouldDisplayColumn(_column) { return true }
  /* eslint-enable */
}
