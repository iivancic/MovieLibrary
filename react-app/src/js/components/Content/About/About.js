import React, { Component } from 'react'
import {
  useParams,
  Route,
  Switch,
  Link,
  BrowserRouter as Router,
  useRouteMatch
} from 'react-router-dom'

const About = () => {
  let match = useRouteMatch()
  return (
    <div>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${match.url}/components`}>Is there something else</Route>
      </Switch>
    </div>
  )
}

export default About
