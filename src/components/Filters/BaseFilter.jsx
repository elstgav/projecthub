import React from 'react'
import PropTypes from 'prop-types'
import { clone } from 'lodash'

import { Session } from 'src/lib'


export default class Filter extends React.Component {
  static propTypes = {
    addCardsFilter:   PropTypes.func.isRequired,
    addColumnsFilter: PropTypes.func.isRequired,
  }

  static defaultState = {}

  constructor(props) {
    super(props)

    const cachedState = this.hydrateCachedState(Session.get(this.cacheKey()))
    this.state = cachedState || this.constructor.defaultState
  }

  componentWillMount() {
    this.props.addCardsFilter(this.shouldDisplayCard.bind(this))
    this.props.addColumnsFilter(this.shouldDisplayColumn.bind(this))
  }

  setState(stateObject, callback = () => {}) {
    super.setState(stateObject, () => {
      Session.set(this.cacheKey(), this.state)
      callback()
    })
  }

  cacheKey() {
    if (!this.constructor.CACHE_KEY) {
      throw new Error(`${this.constructor.name}.CACHE_KEY is undefined`)
    }

    return `state-${this.constructor.CACHE_KEY}`
  }

  /* eslint-disable class-methods-use-this */
  hydrateCachedState(cachedState) {
    return clone(cachedState)
  }

  shouldDisplayCard(_card)     { return true }
  shouldDisplayColumn(_column) { return true }
  /* eslint-enable */
}
