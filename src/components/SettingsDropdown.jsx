import React from 'react'

import { App } from 'src/models'

import Icon   from 'components/Icon'

export default class SettingsDropdown extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isDropdownOpen: false }
  }

  componentDidUpdate() {
    if (this.state.isDropDownOpen) {
      document.addEventListener('click', this.onDocumentClick, { once: true })
    }
  }

  onButtonClick = () => {
    this.setState({ isDropDownOpen: !this.state.isDropDownOpen })
  }

  onDocumentClick = (event) => {
    const isOutsideClick = !this.ref.contains(event.target)
    if (isOutsideClick) this.setState({ isDropDownOpen: false })
  }

  saveRef = (ref) => { this.ref = ref }

  render() {
    return (
      <div
        className={`${App.namespace}-settings-dropdown dropdown ${this.state.isDropDownOpen ? 'active' : ''}`}
        ref={this.saveRef}
      >
        <a
          aria-expanded={this.state.isDropDownOpen}
          aria-haspopup
          aria-label="Settings"
          className={`project-header-link v-align-middle no-underline btn-link ${this.state.isDropDownOpen ? '' : 'tooltipped tooltipped-w'}`}
          onClick={this.onButtonClick}
          role="button"
        >
          <Icon icon="gear" width="14" />
        </a>

        <div className="dropdown-menu-content f5" aria-expanded={this.state.isDropDownOpen}>
          <div className="dropdown-menu dropdown-menu-sw">
            <a className="dropdown-item" href={`${location.pathname}/edit`}>Edit Project</a>
            <a className="dropdown-item" href="#!">ProjectHub Settings</a>
          </div>
        </div>
      </div>
    )
  }
}
