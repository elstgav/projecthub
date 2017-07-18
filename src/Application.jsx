import React from 'react'
import ReactDOM from 'react-dom'

import { App } from 'src/models'

import ProjectBoardFilters from 'components/ProjectBoardFilters'

App.init()

ReactDOM.render(<ProjectBoardFilters />, App.sandbox)
