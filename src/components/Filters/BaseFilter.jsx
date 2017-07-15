import React from 'react'
import PropTypes from 'prop-types'

export default class Filter extends React.Component {
  static propTypes = {
    addCardsFilter:   PropTypes.func.isRequired,
    addColumnsFilter: PropTypes.func.isRequired,
  }

  static defaultState = {}

  constructor(props) {
    super(props)

    this.state =
      JSON.parse(sessionStorage.getItem(this.sessionKey())) ||
      this.constructor.defaultState
  }

  componentWillMount() {
    this.props.addCardsFilter(this.shouldDisplayCard.bind(this))
    this.props.addColumnsFilter(this.shouldDisplayColumn.bind(this))
  }

  setState(stateObject, callback = () => {}) {
    super.setState(stateObject, () => {
      sessionStorage.setItem(this.sessionKey(), JSON.stringify(this.state))
      callback()
    })
  }

  sessionKey = () => `gpf-state-${this.constructor.name}`

  /* eslint-disable class-methods-use-this */
  shouldDisplayCard(_card)     { return true }
  shouldDisplayColumn(_column) { return true }
  /* eslint-enable */
}
