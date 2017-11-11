# ProjectHub
ProjectHub is a Chrome extension that adds filters to GitHub project boards.


## Installation

ProjectHub isn’t hosted on the Chrome web store yet—until then you can manually install it with the directions below:


## Development

1.  [Install yarn](https://yarnpkg.com/en/docs/install)
2.  `yarn install`
3.  `yarn run build:watch`
4.  Go to `chrome://extensions`
5.  Enable Developer mode
6.  Click <kbd>Load unpacked extension…</kbd> and select the `dist/` folder
    > After pulling updates/making changes, you’ll need to refresh `chrome://extensions` to reload the extension

PRs welcome 👍🏻


## Publishing

1.  Bump the version number in `/dist/manifest.json`
2.  Update the changelog
3.  Run `./bin/release`
4.  Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
5.  Click on <kbd>Upload Updated Package</kbd>
6.  Upload the zip file found in `pkg/`


## Changelog

### 0.0.0.3 (November 11, 2017)

* Fixed bug with detecting assignees

### 0.0.0.2 (July 25, 2017)

* First release

