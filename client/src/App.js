import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
// Redux
import { Provider } from "react-redux";
// Router
import { BrowserRouter as Router, Switch } from "react-router-dom";
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

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Flex justifyContent="space-between" alignItems="flex-start" h="100%">
          <Switch>
            <Routes />
          </Switch>
        </Flex>
      </Router>
    </Provider>
  );
}

export default App;
