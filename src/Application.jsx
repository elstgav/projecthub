import React from 'react'
import ReactDOM from 'react-dom'

import { App } from 'src/models'

import ProjectBoardFilters from 'components/ProjectBoardFilters'
import MenuDropdown from 'components/MenuDropdown'

App.init()

ReactDOM.render(<ProjectBoardFilters />, App.controlsSandbox)
ReactDOM.render(<MenuDropdown />,        App.settingsSandbox)
