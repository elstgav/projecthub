import React from 'react'

const sessionKey = 'gpf-state-Focus'

export default class Focus extends React.Component {
  static propTypes = {
    currentUser:      React.PropTypes.string.isRequired,
    onChange:         React.PropTypes.func.isRequired,
    addCardsFilter:   React.PropTypes.func.isRequired,
    addColumnsFilter: React.PropTypes.func.isRequired,
  }

  static defaultState = {
    toggled: false,
  }

  constructor(props) {
    super(props)
    this.state = JSON.parse(sessionStorage.getItem(sessionKey)) || Focus.defaultState
  }

  componentDidMount() {
    this.props.addCardsFilter(this.shouldDisplayCard.bind(this))
    this.props.addColumnsFilter(this.shouldDisplayColumn.bind(this))
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
        className={`btn btn-default ${this.state.toggled ? 'selected' : ''}`}
        onClick={this.onClick}
      >
        Focus
      </button>
    )
  }
}
