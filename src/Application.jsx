import React from 'react'
import ReactDOM from 'react-dom'

import { App, ProjectBoard } from 'src/lib'

import ProjectBoardFilters from 'components/ProjectBoardFilters'
import AddItemsDropdown from 'components/AddItemsDropdown'
import MenuDropdown from 'components/MenuDropdown'

App.init()

ReactDOM.render(<ProjectBoardFilters />, App.controlsSandbox)
ReactDOM.render(<MenuDropdown />, App.menuSandbox)

if (ProjectBoard.isEditable) {
  ReactDOM.render(<AddItemsDropdown />, App.addCardsSandbox)
}
