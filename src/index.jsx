import React from 'react'
import ReactDOM from 'react-dom'
import MyWork from './components/MyWork'
import { stringToDOM } from './utils'

class Application {
  render() {
    this.setupSandbox()
    ReactDOM.render(<MyWork />, this.sandbox)
  }

  setupSandbox() {
    this.sandbox = stringToDOM('<div id="gpf-sandbox" class="mr-2"></div>')
    document.querySelector('.project-header').lastElementChild.prepend(this.sandbox)
  }
}

new Application().render()
