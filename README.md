# ProjectHub [![Version](https://img.shields.io/github/tag/elstgav/projecthub.svg?label=version)]() [![Build Status](https://travis-ci.org/elstgav/projecthub.svg?branch=master)](https://travis-ci.org/elstgav/projecthub) [![Maintainability](https://img.shields.io/codeclimate/maintainability/elstgav/projecthub.svg)](https://codeclimate.com/github/elstgav/projecthub) [![Code Coverage](https://img.shields.io/codeclimate/c/elstgav/projecthub.svg)](https://codeclimate.com/github/elstgav/projecthub)

ProjectHub is a Chrome extension that adds filters to GitHub project boards.


## Installation

ProjectHub isn’t hosted on the Chrome web store yet—until then you can manually install it with the directions below:


## Development

1. [Install yarn](https://yarnpkg.com/en/docs/install)
2. `yarn install`
3. `yarn build:watch`
4. Go to `chrome://extensions`
5. Enable Developer mode
6. Click <kbd>Load unpacked extension…</kbd> and select the `dist/` folder
   > After pulling updates/making changes, you’ll need to refresh `chrome://extensions` to reload the extension

PRs welcome 👍🏻


## Debugging with React Dev Tools

React’s dev tools Chrome Extension unfortunately can’t inspect other extensions. So you’ll need to use their remote debugger instead:

1. Install the debugger: `npm install -g react-devtools`
2. Add 'react-dev-tools.js' to `/dist/manifest.json`:
   ```json
   "content_scripts": [{
     "js": ["react-dev-tools.js", "app.bundle.js"],
    ```
3. Run the debugger: `$ react-devtools`


## Publishing

1. Bump the version number in `/dist/manifest.json`
2. Update the changelog
3. Run `yarn release`
4. Go to the [Chrome Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
5. Click on <kbd>Upload Updated Package</kbd>
6. Upload the zip file found in `pkg/`


## Changelog

See [CHANGELOG](CHANGELOG.md)
