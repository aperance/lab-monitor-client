import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./index.css";
import Layout from "./Layout";
import store from "./store.js";
import { connectStoreToSocket } from "./socket.js";

connectStoreToSocket(store);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Layout />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
