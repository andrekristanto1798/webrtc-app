import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
// Routes
import Home from './Home';
import Meeting from './Meeting';

const history = createBrowserHistory();

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/meeting/:meetingId" component={Meeting} />
      <Redirect to="/" />
    </Switch>
  </Router>
);
