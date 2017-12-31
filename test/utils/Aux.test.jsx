import React from 'react'
import { Aux } from 'src/utils'
import { shallow } from 'enzyme'

describe('Aux', () => {
  it('allows you to return multiple elements without a wrapper element', () => {
    const Elements = () => (
      <Aux>
        <li>one</li>
        <li>two</li>
      </Aux>
    )

    expect(
      shallow(<ul><Elements /></ul>).html(),
    ).toEqual(
      '<ul><li>one</li><li>two</li></ul>',
    )
  })
})
