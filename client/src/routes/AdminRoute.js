import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers/auth';

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => isAuth() && (isAuth().role === 'Admin')
    ? <Component {...props} />
    : <Redirect to={{pathname: '/signin', state: { from: props.location }}}/>}
    />
);

export default AdminRoute;