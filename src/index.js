import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./index.css";
import Layout from "./App";
import store from "./store.js";
import startSocket from "./socket.js";

startSocket(store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Layout />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
