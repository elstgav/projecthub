import React from 'react'
import PropTypes from 'prop-types'

const sessionKey = 'gpf-state-Focus'

export default class Focus extends React.Component {
  static propTypes = {
    currentUser:      PropTypes.string.isRequired,
    onChange:         PropTypes.func.isRequired,
    addCardsFilter:   PropTypes.func.isRequired,
    addColumnsFilter: PropTypes.func.isRequired,
  }

  static defaultState = {
    toggled: false,
  }

  constructor(props) {
    super(props)

    props.addCardsFilter(this.shouldDisplayCard.bind(this))
    props.addColumnsFilter(this.shouldDisplayColumn.bind(this))

    this.state = JSON.parse(sessionStorage.getItem(sessionKey)) || Focus.defaultState
  }

  onClick = () => {
    this.setState({
      toggled: !this.state.toggled,
    }, this.props.onChange)
  }

  setState(stateObject, callback) {
    super.setState(stateObject, callback)
    sessionStorage.setItem(sessionKey, JSON.stringify(stateObject))
  }

  shouldDisplayCard(card) {
    if (!this.state.toggled) return true

    const assignees = JSON.parse(card.dataset.cardAssignee || '[]')
    return assignees.length === 0 || assignees.includes(this.props.currentUser)
  }

  shouldDisplayColumn(column) {
    if (!this.state.toggled) return true
    return column.dataset.id !== '1239586' // Backlog column
  }

  render() {
    return (
      <button
        className={`btn btn-default ${this.state.toggled ? 'selected' : ''} mr-2`}
        onClick={this.onClick}
      >
        Focus
      </button>
    )
  }
}
