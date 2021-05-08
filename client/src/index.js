import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider
      theme={extendTheme({
        config: { useSystemColorMode: false, initialColorMode: "dark" },
      })}
    >
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
