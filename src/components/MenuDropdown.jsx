import React from 'react'

import ProjectBoard from 'src/lib/ProjectBoard'
import { Aux } from 'src/utils'

import Icon from 'components/Icon'
import Dropdown from 'components/Dropdown'

export default class MenuDropdown extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { isNewColumnButtonHidden: false }
    this.syncNewColumnButtonHiddenState()
  }

  onSettingsClick = () => {
    chrome.runtime.sendMessage({ openOptionsPage: true })
  }

  onToggleNewColumnButton = async () => {
    await ProjectBoard.toggleNewColumnButton()
    this.syncNewColumnButtonHiddenState()
  }

  async syncNewColumnButtonHiddenState() {
    this.setState({
      isNewColumnButtonHidden: await ProjectBoard.shouldHideNewColumnButton(),
    })
  }

  render() {
    return (
      <Dropdown
        buttonText={<Icon icon="menu" width="14" />}
        buttonProps={{
          'aria-label': 'Menu',
          className:    'project-header-link muted-link v-align-middle no-underline btn-link',
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
