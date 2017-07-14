import React from 'react'
import Focus from './Focus'
import { show, hide } from '../utils'

const currentUser = document.getElementsByName('octolytics-actor-login')[0].content
const project     = document.querySelector('.project-columns-container')

export default class FilteredProjectBoard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cardFilters: [],
    }

    this.onCardsLoaded(this.renderCards)
  }


  onCardsLoaded = (callback) => {
    const observer = new MutationObserver(() => {
      const finishedLoading = project.querySelector('include-fragment') === null

      if (finishedLoading) {
        callback.call(this)
        observer.disconnect()
      }
    })

    observer.observe(project, { childList: true, subtree: true })
  }

  onFiltersChanged = () => {
    this.renderCards()
  }

  onFilterRegistered = (cardFilter) => {
    this.setState({
      cardFilters: [...this.state.cardFilters, cardFilter],
    })
  }

  renderCards() {
    const cards = Array.from(project.querySelectorAll('.issue-card'))

    cards.forEach((card) => {
      const filteredCards  = this.state.cardFilters.filter(cardFilter => cardFilter(card))
      const shouldShowCard = filteredCards.length > 0

      shouldShowCard ? show(card) : hide(card)
    })
  }

  render() {
    return (
      <Focus currentUser={currentUser} registerFilter={this.onFilterRegistered} onChange={this.onFiltersChanged} />
    )
  }
}
