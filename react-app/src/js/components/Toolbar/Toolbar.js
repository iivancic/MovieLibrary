import React, { Component } from 'react'
import Header from './header/header'
import About from '../Content/About/About'
import Content from '../Content/Content'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'

class Toolbar extends Component {
  render () {
    return (
      <div>
        <Header/>
 
        
      </div>
    )
  }
}

export default Toolbar
