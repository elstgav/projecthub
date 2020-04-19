import React               from 'react'
import ReactDOM            from 'react-dom'

import App                 from 'src/lib/App'
import ProjectBoard        from 'src/lib/ProjectBoard'

import ProjectBoardFilters from 'components/ProjectBoardFilters'
import AddItemsDropdown    from 'components/AddItemsDropdown'
import MenuDropdown        from 'components/MenuDropdown'

ProjectBoard.init()

ReactDOM.render(<ProjectBoardFilters />, App.controlsSandbox)
ReactDOM.render(<MenuDropdown />, App.menuSandbox)

if (ProjectBoard.isEditable) {
  ReactDOM.render(<AddItemsDropdown />, App.addCardsSandbox)
}
