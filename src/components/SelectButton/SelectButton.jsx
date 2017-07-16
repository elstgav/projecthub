/* eslint-disable react/no-multi-comp */

import React     from 'react'
import PropTypes from 'prop-types'

import Button from 'components/Button'
import Icon   from 'components/Icon'

import Option            from './Option'
import SelectedOptionVal from './SelectedOptionVal'


export default class SelectButton extends React.Component {
  static defaultProps = {
    className: '',
    type:      '',
  }

  static propTypes = {
    className: PropTypes.string,
    type:      PropTypes.string,
    options:   PropTypes.arrayOf(PropTypes.shape(Option.propTypes.option)).isRequired,
    onChange:  PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      dropDownOpen: false,
      selection:    this.props.options[0],
    }
  }

  onButtonClick = () => this.setState({ dropDownOpen: !this.state.dropDownOpen })
  onCloseClick  = () => this.setState({ dropDownOpen: false                    })

  onOptionClick = (id) => {
    this.setState({
      selection:    this.props.options.find(option => option.id === id),
      dropDownOpen: false,
    })

    this.props.onChange(id)
  }

  render() {
    return (
      <div className={`select-menu select-menu-modal-right ${this.state.dropDownOpen && 'active'} d-inline-block ${this.props.className}`}>

        <Button
          active={this.state.dropDownOpen}
          aria-expanded={this.state.dropDownOpen}
          aria-haspopup
          className="select-menu-button"
          onClick={this.onButtonClick}
          type="button"
        >
          {this.props.type && <i>{this.props.type}: </i>}
          <SelectedOptionVal option={this.state.selection} />
          {' '}
        </Button>

        <div className="select-menu-modal-holder" aria-expanded={this.state.dropDownOpen}>
          <div className="select-menu-modal">
            <div className="select-menu-header text-left">
              <div onClick={this.onCloseClick} role="button" tabIndex="0">
                <Icon icon="x" ariaLabel="Close" />
              </div>
              <span className="select-menu-title">
                Select {this.props.type.toLowerCase() || 'option'}:
              </span>
            </div>

            <ol className="select-menu-list" role="listbox">
              {this.props.options.map(option => (
                <Option
                  key={option.id}
                  onClick={this.onOptionClick}
                  selected={option.id === this.state.selection.id}
                  option={option}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}
