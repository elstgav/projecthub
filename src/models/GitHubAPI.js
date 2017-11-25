/* eslint-disable no-alert */

import axios from 'axios'
import { oneLine } from 'common-tags'

import { Storage } from 'src/models'

class GitHubAPI {
  static url = 'https://api.github.com'
  static timeoutPeriod = 200

  constructor() {
    this.isTimedOut = false
  }

  async query(endpoint) {
    if (this.isTimedOut) throw new Error('API calls are timed out because we encountered an error')

    const requestOptions = {}
    let response

    const authToken = await Storage.get('githubToken')
    if (authToken) requestOptions.headers = { Authorization: `token ${authToken}` }

    try {
      response = await axios.get(`${GitHubAPI.url}/${endpoint}`, requestOptions)
    } catch (error) {
      this.handleError(error)
      throw error
    }

    return response.data
  }

  getUser = user => this.query(`users/${user}`)

  timeOutApiCalls() {
    if (this.isTimedOut) return

    this.isTimedOut = true
    this.apiTimeout = window.setTimeout(() => {
      window.clearTimeout(this.apiTimeout)
      this.isTimedOut = false
    }, GitHubAPI.timeoutPeriod)
  }

  handleError(error) {
    switch (error.response.status) {
      case 401:
        if (error.response.data.message.includes('Bad credentials') && !this.isTimedOut) {
          alert(oneLine`
            It appears the API token you entered for the ProjectHub Chrome extension is
            not valid 😕. Please go to ProjectHub’s options to learn how to set up a new
            API key. You can access the options page by clicking the gear to the right
            or going to your Chrome extensions page (chrome://extensions/).
          `)
          this.timeOutApiCalls()
        } else {
          console.error(error)
          console.error(error.response)
        }
        break

      case 403:
        if (error.response.data.message.includes('API rate limit exceeded') && !this.isTimedOut) {
          alert(oneLine`
            The ProjectHub Chrome extension has reached the limit of unauthenticated API
            calls it can make 😕. Please go to ProjectHub’s options to learn how to set
            up an API key for unlimited access (it’s easy!). Click the gear to the right
            or go to your Chrome extensions page (chrome://extensions/) to access
            ProjectHub’s options.
          `)
          this.timeOutApiCalls()
        } else {
          console.error(error)
          console.error(error.response)
        }
        break

      case 404:
        console.error(`Request failed with status code 404: No data found at ${error.request.responseURL}`)
        break

      default:
        console.error(error)
        console.error(error.response)
    }
  }
}

export default new GitHubAPI()
