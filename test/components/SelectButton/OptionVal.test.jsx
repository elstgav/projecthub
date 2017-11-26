import React     from 'react'
import { mount } from 'enzyme'

import OptionVal from 'components/SelectButton/OptionVal'

import { testUser, testUserWithNoName, testLabel } from 'test/fixtures'

describe('OptionVal', () => {
  let props
  let describedComponent

  const optionVal = () => {
    describedComponent = describedComponent || mount(<OptionVal {...props} />)
    return describedComponent
  }

  beforeEach(() => {
    props = { option: undefined }
    describedComponent = undefined
  })

  describe('When rendering a plain object', () => {
    beforeEach(() => {
      props.option = { val: 'Foo' }
    })

    it('displays the object’s value', () => {
      expect(
        optionVal().find('.select-menu-item-text').text(),
      ).toBe(props.option.val)
    })
  })

  describe('When rendering a Label', () => {
    beforeEach(() => {
      props.option = testLabel
    })

    it('displays the label’s color', () => {
      expect(
        optionVal().find('.color').first().props().style.backgroundColor,
      ).toBe(testLabel.style.backgroundColor)
    })

    it('displays the label’s text', () => {
      expect(
        optionVal().find('.select-menu-item-text').text(),
      ).toMatch(testLabel.val)
    })
  })

  describe('When rendering a User', () => {
    beforeEach(() => {
      props.option = testUser
    })

    it('displays their avatar', () => {
      const avatar = optionVal().find('Avatar').first()
      expect(avatar.props().user).toBe(testUser)
    })

    it('displays their name', () => {
      expect(
        optionVal().find('.select-menu-item-text').text(),
      ).toMatch(testUser.name)
    })

    it('displays their login', () => {
      expect(
        optionVal().find('.select-menu-item-text').text(),
      ).toMatch(testUser.login)
    })

    describe('…without a name', () => {
      beforeEach(() => {
        props.option = testUserWithNoName
      })

      it('displays just their login', () => {
        expect(
          optionVal().find('.select-menu-item-text').text(),
        ).toBe(testUserWithNoName.login)
      })
    })
  })
})
