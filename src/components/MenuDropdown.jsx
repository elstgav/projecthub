import React from 'react'

import { App, ProjectBoard } from 'src/models'

import Icon   from 'components/Icon'

export default class MenuDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isDropdownOpen: false }
  }

  componentDidUpdate() {
    if (this.state.isDropdownOpen) {
      document.addEventListener('click', this.onDocumentClick, { once: true })
    }
  }

  onDropdownClick = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen })
  }

  onDocumentClick = (event) => {
    const isOutsideClick = !this.ref.contains(event.target)
    if (isOutsideClick) this.setState({ isDropdownOpen: false })
  }

  onActivityClick = () => {
    this.setState({ isDropdownOpen: false })
  }

  onSettingsClick = () => {
    chrome.runtime.sendMessage({ openOptionsPage: true })
  }

  saveRef = (ref) => { this.ref = ref }

  render() {
    return (
      <div
        className={`${App.namespace}-menu-dropdown dropdown ${this.state.isDropdownOpen ? 'active' : ''}`}
        ref={this.saveRef}
      >
        <a
          aria-expanded={this.state.isDropdownOpen}
          aria-haspopup
          aria-label="Menu"
          className={`project-header-link v-align-middle no-underline btn-link ${this.state.isDropdownOpen ? '' : 'tooltipped tooltipped-w'}`}
          onClick={this.onDropdownClick}
          role="button"
        >
          <Icon icon="menu" width="14" />
        </a>

        <div className="dropdown-menu-content f5" aria-expanded={this.state.isDropdownOpen}>
          <ul className="dropdown-menu dropdown-menu-sw">
            <li>
              <button className="dropdown-item btn-link js-show-project-menu" onClick={this.onActivityClick}>
                Activity
              </button>
            </li>

            <li className="dropdown-divider" />

            {!ProjectBoard.readOnly && (
              <li>
                <a className="dropdown-item" href={`${location.pathname}/edit`}>
                  Edit Project
                </a>
              </li>
            )}

            <li>
              <button className="dropdown-item btn-link" onClick={this.onSettingsClick} role="link">
                ProjectHub Settings
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
