import React, { useEffect } from "react";
import "./App.css";

// Router
import { BrowserRouter as Router, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Import Routes
import Routes from "./Routes";

// Import Utilities
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/authAction";
import Navbar from "./components/navbar/Navbar";
import PopupModal from "./components/popup-modal/PopupModal";

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
        <PopupModal />
        <div className="d-flex justify-content-center container-fluid">
          <Switch>
            <Routes />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
