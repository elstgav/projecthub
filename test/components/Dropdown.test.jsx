import React from 'react'
import simulant from 'simulant'

import Aux from 'src/utils/Aux'
import Dropdown from 'components/Dropdown'
import ReactComponentTest from 'test/support/ReactComponentTest'

const test = new ReactComponentTest(Dropdown)

describe('Dropdown', () => {
  beforeEach(() => {
    test.props = {
      buttonText: 'Open me',
      children:      'Pick me',
    }
  })

  it('displays a <Dropdown> element', () => {
    expect(test.Dropdown.find('.dropdown')).toHaveLength(1)
    expect(test.Dropdown.props().className).toBe('projecthub-dropdown dropdown')
    expect(test.Dropdown.find('.dropdown-menu-content').text()).toBe('Pick me')
    expect(test.Dropdown.html()).toMatchSnapshot()
  })

  it('has a configurable className', () => {
    test.props.className = 'foo'
    expect(test.Dropdown.props().className).toContain('foo')
  })

  it('has a configurable direction', () => {
    test.props.dropdownDirection = 'ne'
    expect(test.Dropdown.find('.dropdown-menu').props().className).toContain('dropdown-menu-ne')
  })

  describe('button', () => {
    it('has configurable content', () => {
      expect(test.Dropdown.find('button').text()).toBe('Open me')
    })

    it('has a configurable className', () => {
      test.props.buttonProps = { className: 'foobar', id: 'fooButton' }
      expect(test.Dropdown.find('button').props().className).toBe('foobar')
      expect(test.Dropdown.find('button').props().id).toBe('fooButton')
    })
  })

  describe('when clicked', () => {
    it('toggles an “active” class', () => {
      expect(test.Dropdown.props().className).not.toContain('active')
      test.Dropdown.find('button').simulate('click')
      expect(test.Dropdown.props().className).toContain('active')
      test.Dropdown.find('button').simulate('click')
      expect(test.Dropdown.props().className).not.toContain('active')
    })

    it('toggles its open state', () => {
      expect(test.Dropdown.state('isDropdownOpen')).toBe(false)
      test.Dropdown.find('button').simulate('click')
      expect(test.Dropdown.state('isDropdownOpen')).toBe(true)
      test.Dropdown.find('button').simulate('click')
      expect(test.Dropdown.state('isDropdownOpen')).toBe(false)
    })
  })

  describe('when open', () => {
    const mounted = new ReactComponentTest(Dropdown, 'mount')

    beforeEach(() => {
      mounted.options = {
        attachTo: document.body.appendChild(document.createElement('div')),
      }

      mounted.props = {
        buttonText: 'Open me',
        children: (
          <Aux>
            <li><span className="test-content">Pick me</span></li>
            <li><button className="dropdown-item">Pick me</button></li>
          </Aux>
        ),
      }

      mounted.Dropdown.setState({ isDropdownOpen: true })
    })

    afterEach(() => {
      document.body.innerHTML = ''
    })

    it('stays open when you click inside the dropdown', () => {
      expect(mounted.Dropdown.state('isDropdownOpen')).toBe(true)
      simulant.fire(document.body.querySelector('.test-content'), 'click')
      expect(mounted.Dropdown.state('isDropdownOpen')).toBe(true)
    })

    it('closes itself when you click a dropdown item', () => {
      expect(mounted.Dropdown.state('isDropdownOpen')).toBe(true)
      simulant.fire(document.querySelector('.dropdown-item'), 'click')
      expect(mounted.Dropdown.state('isDropdownOpen')).toBe(false)
    })

    it('closes itself when you click outside the dropdown', () => {
      expect(mounted.Dropdown.state('isDropdownOpen')).toBe(true)
      simulant.fire(document.body, 'click')
      expect(mounted.Dropdown.state('isDropdownOpen')).toBe(false)
    })
  })
})