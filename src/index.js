import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import blue from "material-ui/colors/blue";
import Layout from "./Layout";
import store from "./store.js";
import {} from "./websocket.js";

const theme = createMuiTheme({
  palette: { primary: blue },
  typography: { title: { fontWeight: 400 } }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
