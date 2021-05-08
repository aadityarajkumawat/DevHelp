import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PostEditor from "./components/layout components/editor/PostEditor";
import Post from "./components/layout components/Post/Post";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import SavedPost from "./components/pages/SavedPosts/SavedPost";
import UserProfile from "./components/pages/user-profile/UserProfile";
import PrivateRoute from "./routes/PrivateRoute";

const Routes = () => {
  return (
    <Fragment>
      <Route exact path="/sign-up" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/post" component={Post} />
      <Route exact path="/that-user" component={UserProfile} />
      <PrivateRoute exact path="/compose-post" component={PostEditor} />
      <PrivateRoute
        exact
        path="/dashboard/home/:name/:id"
        component={Dashboard}
      />
      <PrivateRoute exact path="/dashboard/saved" component={SavedPost} />
    </Fragment>
  );
};

export default Routes;
