import React from 'react'
import ReactDOM from 'react-dom'

class Filter extends React.Component {
  render() {
    return (
      <button className="btn btn-default">
        Test
      </button>
    )
  }
}

const sandbox = document.createElement('div')
document.querySelector('.project-header').children[2].prepend(sandbox)
ReactDOM.render(<Filter />, sandbox)
