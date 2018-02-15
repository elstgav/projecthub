import OptionVal from 'components/SelectButton/OptionVal'
import EnzymeTest from 'test/support/EnzymeTest'

import { cachedUser, cachedUserWithNoName, fooLabel } from 'test/fixtures'

const test = new EnzymeTest(OptionVal, 'mount')

describe('OptionVal', () => {
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
      ).toBe(fooLabel.style.backgroundColor)
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
