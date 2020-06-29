import React, { Fragment } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AuthSuccess from './components/AuthSuccess';
import PrivateRoute from './routes/PrivateRoute';
import { Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Post from './components/layout components/Post/Post';
import PostEditor from './components/layout components/editor/PostEditor';

const Routes = () => {
    return (
        <Fragment>
            <PrivateRoute exact path='/auth-success' component={AuthSuccess} />
            <Route exact path='/sign-up' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <Route exact path='/post' component={Post} />
            <Route exact path='/compose-post' component={PostEditor} />
        </Fragment>
    );
};

export default Routes;
