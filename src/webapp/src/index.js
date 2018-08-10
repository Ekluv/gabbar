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
import PrivateRoute from 'components/PrivateRoute';

import indexRoutes from 'routes/index.jsx';

import createReduxStore from './store';

const store = createReduxStore();

ReactDOM.render(
  <Provider store={store}>
  <Router basename="/app">
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      {indexRoutes.map((prop, key) => {
        return (
          <PrivateRoute
            path={prop.path}
            component={prop.component}
            key={key}
            isAllowed={() => window.localStorage.getItem('token')}
            onNotAllowed={() => window.location = '/'}
            redirectTo="/account"
          />
        );
      })}
    </Switch>
  </Router>
  </Provider>,
  document.getElementById('root'),
);
