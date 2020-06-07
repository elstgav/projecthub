import React from 'react'

import ProjectBoard from 'src/lib/ProjectBoard'

import Icon from 'components/Icon'
import Dropdown from 'components/Dropdown'


export default class AddItemsDropdown extends React.PureComponent {
  render() {
    return (
      <Dropdown
        buttonText={(
          <>
            <Icon icon="plus" width="14" className="v-align-middle" />
            &nbsp;
            <span className="dropdown-caret" />
          </>
        )}
        buttonProps={{
          'aria-label': 'Add items',
          className:    'project-header-link muted-link v-align-middle no-underline btn-link',
        }}
      >
        <li>
          <button type="button" className="dropdown-item btn-link js-show-project-triage" onClick={this.closeDropdown}>
            Add cards
          </button>
        </li>

        {ProjectBoard.isEditable && (
          <li className="js-new-column-button">
            <a className="dropdown-item btn-link" href="#add-column" onClick={this.closeDropdown} role="button" rel="facebox">
              Add column
            </a>
          </li>
        )}
      </Dropdown>
    )
  }
}
