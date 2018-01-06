afterEach(() => {
  // Restore all mocks
  jest.restoreAllMocks()

  // Reset chrome
  chrome.storage.sync.clear()
  delete chrome.runtime.lastError

  // Reset sessionStorage
  sessionStorage.clear()

  // Reset DOM
  document.head.innerHTML = ''
  document.body.innerHTML = ''
})
