import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import 'assets/css/material-dashboard-react.css?v=1.2.0';

import indexRoutes from 'routes/index.jsx';

import createReduxStore from './store';

const store = createReduxStore();

ReactDOM.render(
  <Provider store={store}>
  <Router basename="/app">
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      {indexRoutes.map((prop, key) => {
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>
  </Provider>,
  document.getElementById('root'),
);
