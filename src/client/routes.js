import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import About from '../containers/About'
import App from '../containers/App'
import Concact from '../containers/Concact'
import Demo from '../containers/Demo'
import API from '../containers/API'
import List from '../containers/List'
import ModifyInfo from '../containers/ModifyInfo'
import Perfermance from '../containers/Perfermance'

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={About} />
    <Route path="about" component={About} />
    <Route path="concact" component={Concact} />
    <Route path="demo" component={Demo} />
    <Route path="list" component={List} />
    <Route path="api" component={API} />
    <Route path="modify" component={ModifyInfo} />
    <Route path="perf" component={Perfermance} />
  </Route>
)

export default routes