import React from 'react'
import ReactDOM from 'react-dom'

import { App } from 'src/models'

import ProjectBoardFilters from 'components/ProjectBoardFilters'
import SettingsDropdown from 'components/SettingsDropdown'

App.init()

ReactDOM.render(<ProjectBoardFilters />, App.controlsSandbox)
ReactDOM.render(<SettingsDropdown />,    App.settingsSandbox)
