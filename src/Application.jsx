import React from 'react'
import ReactDOM from 'react-dom'

import { App } from 'src/models'
import { stringToDOM } from 'src/utils'

import ProjectBoardFilters from 'components/ProjectBoardFilters'

class Application {
  setupSandbox() {
    this.sandbox = stringToDOM(`<div id="${App.namespace}-sandbox" class="ml-2"></div>`)
    document.querySelector('.project-header').lastElementChild.prepend(this.sandbox)
  }

  render() {
    this.setupSandbox()
    ReactDOM.render(<ProjectBoardFilters />, this.sandbox)
  }
}

new Application().render()
