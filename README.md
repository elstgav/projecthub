# ProjectHub
ProjectHub is a Chrome extension that adds filters to GitHub project boards.


## Installation

ProjectHub isn’t hosted on the Chrome web store yet—until then you can manually install it with the directions below:


## Development

1.  [Install yarn](https://yarnpkg.com/en/docs/install)
2.  `yarn install`
3.  `yarn build:watch`
4.  Go to `chrome://extensions`
5.  Enable Developer mode
6.  Click <kbd>Load unpacked extension…</kbd> and select the `dist/` folder
    > After pulling updates/making changes, you’ll need to refresh `chrome://extensions` to reload the extension

PRs welcome 👍🏻


## Publishing

1.  Bump the version number in `/dist/manifest.json`
2.  Update the changelog
3.  Run `yarn release`
4.  Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
5.  Click on <kbd>Upload Updated Package</kbd>
6.  Upload the zip file found in `pkg/`


## Changelog

### 0.0.0.7 (November 22, 2017)
* Fix caching bug
* Fix bug with label filter default state

### 0.0.0.6 (November 22, 2017)
* Fix filter default states rendering incorrectly

### 0.0.0.5 (November 22, 2017)
* Fix assignees not appearing in assignee filter
* Fix filter labels not displaying correctly on page reload (#1)

### 0.0.0.4 (November 11, 2017)

* Displays user’s real names when possible #5
* Fixed bug where dropdowns didn’t show the correct value on page refresh #1

### 0.0.0.3 (November 11, 2017)

* Fixed bug with detecting assignees

### 0.0.0.2 (July 25, 2017)

* First release

