import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import Layout from "./Layout";
import store from "./store";
import {} from "./websocket";
import { errorMessageSet } from "./actions/actionCreators";

const theme = createMuiTheme({
  palette: { primary: blue },
  typography: { useNextVariants: true, h6: { fontWeight: 400 } }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Layout />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// @ts-ignore
window.onerror = (message, source, fileno, columnno, err) => {
  if (err) store.dispatch(errorMessageSet({ err }));
};
