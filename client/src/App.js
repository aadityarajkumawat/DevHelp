import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
// Redux
import { connect } from "react-redux";
// Router
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { getAdminPrivilages } from "./actions/adminPrivilagesAction";
import { loadUser } from "./actions/authAction";
import Navbar from "./components/navbar/Navbar";
// Import Routes
import Routes from "./Routes";
import store from "./store";
// Import Utilities
import setAuthToken from "./utils/setAuthToken";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

function App({ auth, getAdminPrivilages }) {
  useEffect(() => {
    store.dispatch(loadUser());
    getAdminPrivilages(true);
  }, []);

  useEffect(() => {
    getAdminPrivilages(true);
  }, [auth.isAuthenticated]);

  return (
    <Router>
      <Navbar />
      <Flex justifyContent="space-between" alignItems="flex-start" h="100%">
        <Switch>
          <Routes />
        </Switch>
      </Flex>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { getAdminPrivilages })(App);
