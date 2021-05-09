import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./store";

export const API = "http://localhost:5000";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider
        theme={extendTheme({
          config: { useSystemColorMode: false, initialColorMode: "dark" },
        })}
      >
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
