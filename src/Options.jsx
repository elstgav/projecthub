import React from 'react'
import ReactDOM from 'react-dom'

import Storage from 'src/models/Storage' // FIXME: Can’t use index.js. See #20


class OptionsPage extends React.Component {
  static DEFAULTS = {
    githubToken: '',
  }

  constructor(props) {
    super(props)

    this.state = OptionsPage.DEFAULTS

    Storage.get(OptionsPage.DEFAULTS, (settings) => {
      this.setState(settings)
    })
  }

  onChange = (event) => {
    this.setState({ githubToken: event.target.value })
  }

  setState(items, callback = () => {}) {
    super.setState(items, () => {
      Storage.set(items, () => {
        if (!chrome.runtime.lastError) return
        console.error('Something went wrong while trying to save your settings: %o', chrome.runtime.lastError)
      })
    })
  }

  render() {
    return (
      <form>
        <label htmlFor="github-token">GitHub access token</label>
        <input
          type="text"
          name="github-token"
          onChange={this.onChange}
          value={this.state.githubToken}
        />
      </form>
    )
  }
}

ReactDOM.render(<OptionsPage />, document.getElementById('root'))
