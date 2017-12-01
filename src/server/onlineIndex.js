/* eslint-disable no-console, no-use-before-define */

import path from 'path'
import Express from 'express'
import qs from 'qs'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'

import configureStore from '../store/configureStore'
import routes from '../client/routes'
import App from '../containers/App'
import adjust from '../common/js/adjust'

const app = new Express()
const port = 3200

app.use(Express.static(path.join(__dirname, '../../dist')));


function handleRender(req, res) {
  match({ routes: routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`server error: ${err}`)
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const helloChan = {
        config: {
          text: 'I come from serve side'
        }
      }
      const initialState = { helloChan }
      const store = configureStore(initialState)
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )
      const finalState = store.getState()
      res.end(renderFullPage(html, finalState))
    } else {
      res.status(404).end('404 not found')
    }
  })
}

app.use(handleRender)

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>monkey Component</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta charset="utf-8" />
        <link rel="stylesheet" type="text/css" href="./app.css"> 
      </head>
      <body>
        <div id="app"><div>${html}</div></div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          ${adjust}
        </script>
        <script async src="./main.js"></script>
        <script async src="./vendor.js"></script>
        
      </body>
    </html>
    `
}

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
})
