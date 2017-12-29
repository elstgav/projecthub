function getOrSetStorage(getOrSet, requestedItems) {
  const requestedSingleItem = (typeof requestedItems === 'string')

  return new Promise((resolve, reject) => {
    chrome.storage.sync[getOrSet](requestedItems, (items) => {
      if (chrome.runtime.lastError) {
        console.error(`chrome.storage.sync.${getOrSet} error: %o`, chrome.runtime.lastError)
        return reject(chrome.runtime.lastError)
      }

      return requestedSingleItem ? resolve(items[requestedItems]) : resolve(items)
    })
  })
}

const Storage = {
  get: requestedItems => getOrSetStorage('get', requestedItems),
  set: requestedItems => getOrSetStorage('set', requestedItems),
}

export default Storage
