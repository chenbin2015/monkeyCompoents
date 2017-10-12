import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Router, browserHistory } from 'react-router'
import { createBrowserHistory } from 'history'
import Perf from 'react-addons-perf'

import reducers from '../reducers'
import { AppContainer } from 'react-hot-loader'
import configureStore from '../store/configureStore'
import routes from './routes'

window.Perf = Perf
const initialState = window.__INITIAL_STATE__
const store = configureStore(initialState)

const rootEl = document.getElementById('app')
const render = () => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Router history={browserHistory}>
        { routes }
      </Router>
    </Provider>
  </AppContainer>,
  rootEl
)

render()

if (module.hot) {
  module.hot.accept(() => { render() })
}