import React, { Fragment } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthSuccess from './components/AuthSuccess';
import PrivateRoute from './routes/PrivateRoute';
import { Route } from 'react-router-dom';

const Routes = () => {
    return (
        <Fragment>
            <Route exact path='/' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/auth-success' component={AuthSuccess} />
        </Fragment>
    );
};

export default Routes;
