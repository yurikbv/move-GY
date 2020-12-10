import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

const DriverRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuth() && (isAuth().role === 'Driver' || isAuth().role === 'Admin')
    ? <Component {...props} />
    : <Redirect to={{pathname: '/signin', state: { from: props.location }}}/>}
    />
);

export default DriverRoute;