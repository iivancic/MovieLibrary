import React, { Component } from 'react'
import Toolbar from '../../Toolbar/Toolbar'
import classes from './Layout.module.css'
import Content from '../../Content/Content'
import { Route, Switch, Link, BrowserRouter as Router } from 'react-router-dom'
import About from '../../Content/About/About'

class Layout extends Component {
  render () {
    return (
      <div>
        <Toolbar />
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to='/about'>About</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to='/users'>Users</Link>
                </li>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route path='/about' component={About} />
            <Route path='/users'>Users go here</Route>
            <Route path='/' exact component={Content} />
          </Switch>
          </Router>
          
      </div>
    )
  }
}
export default Layout
