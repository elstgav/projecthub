afterEach(() => {
  // Reset chrome
  chrome.storage.sync.clear()
  chrome.runtime.lastError = undefined

  // Reset sessionStorage
  sessionStorage.clear()

  // Reset DOM
  document.head.innerHTML = ''
  document.body.innerHTML = ''
})
