import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
//import blue from "material-ui/colors/blue";
import Layout from "./Layout";
import store from "./store.js";
import {} from "./socket.js";

const theme = createMuiTheme({});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
