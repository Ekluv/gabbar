import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';


const PrivateRoute = ({ component: Component, ...rest }) => {
  const { redirectTo, isAllowed, onNotAllowed } = rest;
  if (!isAllowed()) {
    onNotAllowed()
  }
  return (
    <Route
      {...rest}
      render={props => isAllowed() ? <Component {...props} /> : <Redirect to={redirectTo} />}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  isAllowed: PropTypes.func,
};

PrivateRoute.defaultProps = {
  isAllowed: () => true,
  onNotAllowed: () => {},
};

export default PrivateRoute;
