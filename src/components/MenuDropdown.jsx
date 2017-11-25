import React from 'react'

import { App, ProjectBoard } from 'src/models'

import Icon   from 'components/Icon'

export default class MenuDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isDropdownOpen: false }
  }

  componentDidUpdate() {
    if (this.state.isDropDownOpen) {
      document.addEventListener('click', this.onDocumentClick, { once: true })
    }
  }

  onDropdownClick = () => {
    this.setState({ isDropDownOpen: !this.state.isDropDownOpen })
  }

  onDocumentClick = (event) => {
    const isOutsideClick = !this.ref.contains(event.target)
    if (isOutsideClick) this.setState({ isDropDownOpen: false })
  }

  onSettingsClick = () => {
    chrome.runtime.sendMessage({ openOptionsPage: true })
  }

  saveRef = (ref) => { this.ref = ref }

  render() {
    return (
      <div
        className={`${App.namespace}-menu-dropdown dropdown ${this.state.isDropDownOpen ? 'active' : ''}`}
        ref={this.saveRef}
      >
        <a
          aria-expanded={this.state.isDropDownOpen}
          aria-haspopup
          aria-label="Menu"
          className={`project-header-link v-align-middle no-underline btn-link ${this.state.isDropDownOpen ? '' : 'tooltipped tooltipped-w'}`}
          onClick={this.onDropdownClick}
          role="button"
        >
          <Icon icon="menu" width="14" />
        </a>

        <div className="dropdown-menu-content f5" aria-expanded={this.state.isDropDownOpen}>
          <ul className="dropdown-menu dropdown-menu-sw">
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
