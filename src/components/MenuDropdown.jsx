import React from 'react'

import { ProjectBoard, Session } from 'src/lib'
import { Aux } from 'src/utils'

import Icon from 'components/Icon'
import Dropdown from 'components/Dropdown'

export default class MenuDropdown extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = { isNewColumnButtonHidden : ProjectBoard.isNewColumnButtonHidden }
  }

  onSettingsClick = () => {
    chrome.runtime.sendMessage({ openOptionsPage: true })
  }

  onToggleNewColumnButton = () => {
    ProjectBoard.toggleNewColumnButton()
    this.setState({ isNewColumnButtonHidden : ProjectBoard.isNewColumnButtonHidden })
  }

  render() {
    return (
      <Dropdown
        buttonText={<Icon icon="menu" width="14" />}
        buttonProps={{
          'aria-label': 'Menu',
          className:    'project-header-link v-align-middle no-underline btn-link',
        }}
      >
        <li>
          <button className="dropdown-item btn-link js-show-project-menu">
            Activity
          </button>
        </li>

        <li className="dropdown-divider" />

        {ProjectBoard.isEditable && (
          <Aux>
            <li>
              <button className="dropdown-item btn-link" onClick={this.onToggleNewColumnButton}>
                {this.state.isNewColumnButtonHidden ? 'Show' : 'Hide'} “Add column” button
              </button>
            </li>

            <li>
              <a className="dropdown-item" href={`${window.location.pathname}/edit`}>
                Edit Project
              </a>
            </li>
          </Aux>
        )}

        <li>
          <button className="dropdown-item btn-link" onClick={this.onSettingsClick} role="link">
            ProjectHub Settings
          </button>
        </li>
      </Dropdown>
    )
  }
}
