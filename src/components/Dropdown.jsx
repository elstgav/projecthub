import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import App from 'src/lib/App'


export default class Dropdown extends React.Component {
  static propTypes = {
    buttonText:        PropTypes.node.isRequired,
    buttonProps:       PropTypes.object, // eslint-disable-line react/forbid-prop-types
    children:          PropTypes.node.isRequired,
    className:         PropTypes.string,
    dropdownDirection: PropTypes.string,
  }

  static defaultProps = {
    buttonProps:       {},
    className:         null,
    dropdownDirection: 'sw',
  }

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
    this.setState(prevState => ({ isDropdownOpen: !prevState.isDropdownOpen }))
  }

  onDocumentClick = (event) => {
    const isDropdownItem = event.target.classList.contains('dropdown-item')
    const isOutsideClick = !this.ref.contains(event.target)

    if (isDropdownItem || isOutsideClick) this.closeDropdown()
  }

  closeDropdown() {
    this.setState({ isDropdownOpen: false })
  }

  saveRef = (ref) => { this.ref = ref }

  render() {
    return (
      <div
        className={classNames(
          `${App.namespace}-dropdown`,
          'dropdown',
          { active: this.state.isDropdownOpen },
          this.props.className,
        )}
        ref={this.saveRef}
      >
        <button
          aria-expanded={this.state.isDropdownOpen}
          aria-haspopup
          className="btn"
          onClick={this.onDropdownClick}
          type="button"
          {...this.props.buttonProps}
        >
          {this.props.buttonText}
        </button>

        <div className="dropdown-menu-content f5" aria-expanded={this.state.isDropdownOpen}>
          <ul className={`dropdown-menu dropdown-menu-${this.props.dropdownDirection}`}>
            {this.props.children}
          </ul>
        </div>
      </div>
    )
  }
}
