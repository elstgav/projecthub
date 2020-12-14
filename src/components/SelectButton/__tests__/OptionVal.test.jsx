import OptionVal from 'components/SelectButton/OptionVal'
import EnzymeTestWrapper from 'test/support/EnzymeTestWrapper'

import { cachedUser, cachedUserWithNoName, fooLabel } from 'test/fixtures'

const test = new EnzymeTestWrapper(OptionVal)

describe('OptionVal', () => {
  beforeEach(() => {
    test.renderMethod = EnzymeTestWrapper.renderMethods.fullDOM
  })

  describe('When rendering a plain object', () => {
    beforeEach(() => {
      test.props.option = { val: 'Foo' }
    })

    it('displays the object’s value', () => {
      expect(
        test.OptionVal.find('.select-menu-item-text').text(),
      ).toBe(test.props.option.val)
    })
  })

  describe('When rendering a Label', () => {
    beforeEach(() => {
      test.props.option = fooLabel
    })

    it('displays the label’s color', () => {
      expect(
        test.OptionVal.find('.color').first().props().style.backgroundColor,
      ).toBe('rgb(255,0,0)')
    })

    it('displays the label’s text', () => {
      expect(
        test.OptionVal.find('.select-menu-item-text').text(),
      ).toMatch(fooLabel.val)
    })
  })

  describe('When rendering a User', () => {
    beforeEach(() => {
      test.props.option = cachedUser
    })

    it('displays their avatar', () => {
      const avatar = test.OptionVal.find('Avatar').first()
      expect(avatar.props().user).toBe(cachedUser)
    })

    it('displays their name and login', () => {
      expect(
        test.OptionVal.find('.select-menu-item-text').text(),
      ).toBe(`${cachedUser.name} ${cachedUser.login}`)
    })

    describe('…without a name', () => {
      beforeEach(() => {
        test.props.option = cachedUserWithNoName
      })

      it('displays just their login', () => {
        expect(
          test.OptionVal.find('.select-menu-item-text').text(),
        ).toBe(cachedUserWithNoName.login)
      })
    })
  })
})
