import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Layout from "./Layout";
import store from "./store.js";
import {} from "./socket.js";

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Layout />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
