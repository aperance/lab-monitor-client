import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

import { WebsocketProvider } from "./WebsocketContext";
import store from "./redux/store";
import App from "./components/App";

const theme = createMuiTheme({
  palette: { primary: blue }
});

ReactDOM.render(
  <Provider store={store}>
    <WebsocketProvider>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </WebsocketProvider>
  </Provider>,
  document.getElementById("root")
);
