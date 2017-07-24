const Storage = {
  get(items, callback = () => {}) {
    return chrome.storage.sync.get(items, callback)
  },

  set(items, callback = () => {}) {
    return chrome.storage.sync.set(items, callback)
  },
}

export default Storage
