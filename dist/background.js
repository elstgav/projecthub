chrome.runtime.onMessage.addListener(request => {
  if (request.openOptionsPage) chrome.runtime.openOptionsPage()
})
