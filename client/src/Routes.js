import React, { Fragment } from 'react';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './routes/PrivateRoute';
import { Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Post from './components/layout components/Post/Post';
import PostEditor from './components/layout components/editor/PostEditor';
import Dashboard from './components/pages/Dashboard';
import SavedPost from './components/pages/SavedPosts/SavedPost';

const Routes = () => {
    return (
        <Fragment>
            <Route exact path='/sign-up' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <Route exact path='/post' component={Post} />
            <PrivateRoute exact path='/compose-post' component={PostEditor} />
            <PrivateRoute exact path='/dashboard/home' component={Dashboard} />
            <PrivateRoute exact path='/dashboard/saved' component={SavedPost} />
        </Fragment>
    );
};

export default Routes;
