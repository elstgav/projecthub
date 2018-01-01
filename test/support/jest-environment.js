afterEach(() => {
  chrome.storage.sync.clear()
  sessionStorage.clear()
  document.head.innerHTML = ''
  document.body.innerHTML = ''
})
