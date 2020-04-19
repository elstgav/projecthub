import React from 'react'
import ReactDOM from 'react-dom'

import Storage from 'src/lib/Storage'


class OptionsPage extends React.Component {
  static DEFAULTS = {
    githubToken: '',
  }

  constructor(props) {
    super(props)

    this.state = OptionsPage.DEFAULTS

    Storage
      .get(OptionsPage.DEFAULTS)
      .then(settings => this.setState(settings))
  }

  onTokenChange = (event) => {
    this.setState({ githubToken: event.target.value })
  }

  setState(items, callback = () => {}) {
    super.setState(items, () => {
      Storage.set(items).then(callback)
    })
  }

  render() {
    return (
      <form>
        <p>ProjectHub uses <a href="https://developer.github.com/v3/">GitHub’s API</a> to retrieve project metadata. By default, it makes unauthenticated requests to the GitHub API. However, authentication is required after exceeding <a href="https://developer.github.com/v3/#rate-limiting">GitHub’s rate limit on unauthenticated requests</a>.</p>

        <p>When that happens, ProjectHub will need your <a href="https://help.github.com/articles/creating-an-access-token-for-command-line-use">GitHub personal access token</a> to make requests. If you don’t already have one, <a href="https://github.com/settings/tokens/new">create one</a>, then copy and paste it into the textbox below. Note that the minimal scopes that should be granted are <code>read:org</code> and <code>read:user</code>.</p>

        <label htmlFor="github-token">
          GitHub access token:
          {' '}
          <input
            type="text"
            id="github-token"
            name="github-token"
            onChange={this.onTokenChange}
            value={this.state.githubToken}
          />
        </label>
      </form>
    )
  }
}

ReactDOM.render(<OptionsPage />, document.getElementById('root'))
