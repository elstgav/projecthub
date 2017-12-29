import React from 'react'

import { ProjectBoard } from 'src/lib'

import Icon from 'components/Icon'
import Dropdown from 'components/Dropdown'


export default class MenuDropdown extends React.PureComponent {
  onSettingsClick = () => {
    chrome.runtime.sendMessage({ openOptionsPage: true })
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
          <li>
            <a className="dropdown-item" href={`${window.location.pathname}/edit`}>
              Edit Project
            </a>
          </li>
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
