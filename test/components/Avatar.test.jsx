import React from 'react'
import { shallow } from 'enzyme'

import Avatar from 'components/Avatar'

import { testUser } from 'test/fixtures'

describe('Avatar', () => {
  let props
  let describedComponent

  const avatar = () => {
    describedComponent = describedComponent || shallow(<Avatar {...props} />)
    return describedComponent
  }

  beforeEach(() => {
    props = { user: testUser }
    describedComponent = undefined
  })

  it('displays a single <img>', () => {
    expect(avatar().find('img')).toHaveLength(1)
    expect(avatar().html()).toMatchSnapshot()
  })

  it('has a default size', () => {
    expect(avatar().props()).toMatchObject({ height: 20, width: 20 })
  })

  it('has configurable size', () => {
    props.size = 40
    expect(avatar().props()).toMatchObject({ height: 40, width: 40 })
  })

  it('sets the alt tag to the user’s login', () => {
    expect(avatar().props()).toHaveProperty('alt', `@${props.user.login}`)
  })

  it('sets the img src to the user’s avatar', () => {
    expect(avatar().props()).toHaveProperty('src', props.user.avatar)
  })
})
