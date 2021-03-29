
import 'bulma/css/bulma.min.css'
import 'bulma-switch/dist/css/bulma-switch.min.css'
import './App.scss'
import React from 'react'
import { render } from 'react-dom'
import cx from 'clsx'
import { Switch, Route, HashRouter as Router, useLocation } from 'react-router-dom'
import { Form } from './form'
import { List } from './list'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { QueryClientProvider } from 'react-query'
import { trpc } from './utils/trpc'
// import { history } from '../comps/utils'

function App() {
  let location = useLocation()
  return (
    <TransitionGroup>
      <Switch>
        <Route path="/form">
          <Form />
        </Route>
        <Route path="/">
          <List />
        </Route>
      </Switch>
    </TransitionGroup>
  )
}

export default function Root() {
  return (
    <div className={cx('root', 'container')}>
      <QueryClientProvider client={trpc.queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </div>
  )
}
