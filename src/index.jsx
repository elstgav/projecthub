import React from 'react'
import ReactDOM from 'react-dom'
import MyWork from './components/MyWork'

const sandbox = document.createElement('div')
document.querySelector('.project-header').children[2].prepend(sandbox)
ReactDOM.render(<MyWork />, sandbox)
