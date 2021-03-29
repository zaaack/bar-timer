import React from 'react'
import { render } from 'react-dom'
import cx from 'clsx'
import { Switch, Route, HashRouter as Router, useLocation } from 'react-router-dom'
import { Form } from '../comps/form'
import { List } from '../comps/list'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
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
      <Router>
        <App />
      </Router>
    </div>
  )
}
