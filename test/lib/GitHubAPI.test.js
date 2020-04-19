import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import GitHubAPI from 'src/lib/GitHubAPI'
import Storage   from 'src/lib/Storage'

const mock = new MockAdapter(axios)


describe('GitHubAPI', () => {
  let alertMessage
  let error

  beforeEach(() => {
    jest.useFakeTimers()
    jest.spyOn(window,  'alert').mockImplementation((msg) => { alertMessage = msg })
    jest.spyOn(console, 'error').mockImplementation((err) => { error        = err })
    jest.spyOn(axios, 'get')
  })

  afterEach(() => {
    GitHubAPI.isTimedOut = false
  })

  describe('.query()', () => {
    it('returns JSON from GitHub API', async () => {
      mock.onGet('https://api.github.com/foo/bar').replyOnce(200, 'foo bar!')
      const data = await GitHubAPI.query('foo/bar')
      expect(data).toBe('foo bar!')
    })

    it('adds an authToken to the request if we have one set', async () => {
      Storage.set({ githubToken: 'abc123' })
      mock.onGet('https://api.github.com/foo/bar').replyOnce(200, 'foo bar!')

      await GitHubAPI.query('foo/bar')

      expect(axios.get).toHaveBeenCalledWith(expect.anything(), {
        headers: { Authorization: 'token abc123' },
      })
    })

    it('raises an alert if our credentials are bad', async () => {
      mock.onGet('https://api.github.com/bad/request').replyOnce(401, {
        message:           'Bad credentials',
        documentation_url: 'https://developer.github.com/v3',
      })

      await expect(
        GitHubAPI.query('bad/request'),
      ).rejects.toThrow('Request failed with status code 401')

      expect(window.alert).toHaveBeenCalled()
      expect(alertMessage).toContain(
        'the API token you entered for the ProjectHub Chrome extension is not valid',
      )
      expect(GitHubAPI.isTimedOut).toBe(true)
    })

    it('raises an alert if we exceeded our API rate limit', async () => {
      mock.onGet('https://api.github.com/too/fast').replyOnce(403, {
        message:           "API rate limit exceeded for 192.168.1.1. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
        documentation_url: 'https://developer.github.com/v3/#rate-limiting',
      })

      await expect(
        GitHubAPI.query('too/fast'),
      ).rejects.toThrow('Request failed with status code 403')

      expect(window.alert).toHaveBeenCalled()
      expect(alertMessage).toContain(
        'extension has reached the limit of unauthenticated API calls it can make',
      )
      expect(GitHubAPI.isTimedOut).toBe(true)
    })

    it('logs an error if we hit a 418 or 403 we don’t recognize', async () => {
      mock.onGet('https://api.github.com/bad/request').replyOnce(401, {
        message:           'Something else bad',
        documentation_url: 'https://developer.github.com/v3',
      })

      await expect(
        GitHubAPI.query('bad/request'),
      ).rejects.toThrow('Request failed with status code 401')

      expect(console.error).toHaveBeenCalled()
      expect(window.alert).not.toHaveBeenCalled()
      expect(GitHubAPI.isTimedOut).toBe(false)
    })

    it('logs an error if we hit a 404', async () => {
      mock.onGet('https://api.github.com/wrong/path').replyOnce(404, {
        message:           'Not Found',
        documentation_url: 'https://developer.github.com/v3',
      })

      await expect(
        GitHubAPI.query('wrong/path'),
      ).rejects.toThrow('Request failed with status code 404')

      expect(console.error).toHaveBeenCalled()
      expect(error.data.message).toBe('Not Found')
    })

    it('times out on multiple bad API calls', async () => {
      mock.onGet('https://api.github.com/bad/request').replyOnce(401, { message: 'Bad credentials' })

      await expect(GitHubAPI.query('bad/request')).rejects.toThrow()

      expect(GitHubAPI.isTimedOut).toBe(true)

      await expect(GitHubAPI.query('bad/request')).rejects.toThrow('API calls are timed out')

      expect(axios.get).toHaveBeenCalledTimes(1)
    })

    it('stops timing out after timeoutPeriod', async () => {
      mock.onGet('https://api.github.com/bad/request').replyOnce(401, { message: 'Bad credentials' })

      await expect(GitHubAPI.query('bad/request')).rejects.toThrow()

      expect(GitHubAPI.isTimedOut).toBe(true)
      expect(setTimeout).toHaveBeenCalledTimes(1)

      jest.runAllTimers()

      expect(GitHubAPI.isTimedOut).toBe(false)
    })
  })

  describe('.timeOutApiCalls', () => {
    it('doesn’t create multiple timeouts if one is already running', () => {
      GitHubAPI.isTimedOut = true
      GitHubAPI.timeOutApiCalls()
      expect(setTimeout).not.toHaveBeenCalled()
    })
  })

  describe('.getUser()', () => {
    it('returns user JSON', async () => {
      mock.onGet('https://api.github.com/users/tester').replyOnce(200, { foo: 'bar' })
      const user = await GitHubAPI.getUser('tester')
      expect(user.foo).toBe('bar')
    })
  })
})
