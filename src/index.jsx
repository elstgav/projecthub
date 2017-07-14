import React from 'react'
import ReactDOM from 'react-dom'
import FilteredProjectBoard from './components/FilteredProjectBoard'
import { stringToDOM } from './utils'

class Application {
  setupSandbox() {
    this.sandbox = stringToDOM('<div id="gpf-sandbox" class="mr-2"></div>')
    document.querySelector('.project-header').lastElementChild.prepend(this.sandbox)
  }

  render() {
    this.setupSandbox()
    ReactDOM.render(<FilteredProjectBoard />, this.sandbox)
  }
}

new Application().render()
