import { Storage } from 'src/lib'

describe('Storage', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error')
  })

  describe('.get()', () => {
    beforeEach(() => {
      chrome.storage.sync.set({ foo: 'bar', biz: 'qat' })
    })

    it('returns a value from storage', async () => {
      expect(await Storage.get('foo')).toBe('bar')
    })

    it('returns undefined if key doesn’t exist', async () => {
      expect(await Storage.get('nope')).toBeUndefined()
    })

    it('returns multiple values from storage', async () => {
      expect(await Storage.get(['foo', 'biz'])).toMatchObject({ foo: 'bar', biz: 'qat' })
    })

    it('logs an error if chrome has a runtime error', async () => {
      chrome.runtime.lastError = 'Chrome’s error'
      await expect(Storage.get('whatever')).rejects.toThrow('Chrome’s error')
      expect(console.error).toHaveBeenCalledWith(
        'chrome.storage.sync.get error: %o',
        'Chrome’s error',
      )
    })
  })

  describe('.set()', () => {
    it('sets a value in storage', async () => {
      await Storage.set({ new: 'value' })

      chrome.storage.sync.get('new', (items) => {
        expect(items).toMatchObject({ new: 'value' })
      })
    })

    it('sets multiple values in storage', async () => {
      await Storage.set({ foo: 'bar', biz: 'qat' })

      chrome.storage.sync.get(['foo', 'biz'], (items) => {
        expect(items).toMatchObject({ foo: 'bar', biz: 'qat' })
      })
    })
  })
})
