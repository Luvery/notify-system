import React from 'react';
import { navigate } from 'gatsby';
import { isLoggedIn } from '../../utils/auth';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ component: Component, location, ...rest }) => {
  // eslint-disable-next-line react/prop-types
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate('/app/login');
    return null;
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...rest} />;
};

export default PrivateRoute;
