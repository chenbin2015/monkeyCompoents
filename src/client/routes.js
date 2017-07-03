import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import About from '../containers/About'
import App from '../containers/App'
import Concact from '../containers/Concact'
import Demo from '../containers/Demo'
import API from '../containers/API'

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={About} />
    <Route path="about" component={About} />
    <Route path="concact" component={Concact} />
    <Route path="demo" component={Demo} />
    <Route path="api" component={API} />
  </Route>
)

export default routes