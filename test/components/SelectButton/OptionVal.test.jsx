import OptionVal from 'components/SelectButton/OptionVal'
import ReactComponentTest from 'test/support/ReactComponentTest'

import { testUser, testUserWithNoName, testLabel } from 'test/fixtures'

const test = new ReactComponentTest(OptionVal, 'mount')

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
      test.props.option = testLabel
    })

    it('displays the label’s color', () => {
      expect(
        test.OptionVal.find('.color').first().props().style.backgroundColor,
      ).toBe(testLabel.style.backgroundColor)
    })

    it('displays the label’s text', () => {
      expect(
        test.OptionVal.find('.select-menu-item-text').text(),
      ).toMatch(testLabel.val)
    })
  })

  describe('When rendering a User', () => {
    beforeEach(() => {
      test.props.option = testUser
    })

    it('displays their avatar', () => {
      const avatar = test.OptionVal.find('Avatar').first()
      expect(avatar.props().user).toBe(testUser)
    })

    it('displays their name', () => {
      expect(
        test.OptionVal.find('.select-menu-item-text').text(),
      ).toMatch(testUser.name)
    })

    it('displays their login', () => {
      expect(
        test.OptionVal.find('.select-menu-item-text').text(),
      ).toMatch(testUser.login)
    })

    describe('…without a name', () => {
      beforeEach(() => {
        test.props.option = testUserWithNoName
      })

      it('displays just their login', () => {
        expect(
          test.OptionVal.find('.select-menu-item-text').text(),
        ).toBe(testUserWithNoName.login)
      })
    })
  })
})
