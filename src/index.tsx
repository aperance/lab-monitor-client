import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { WebsocketProvider } from "./Websocket";
import blue from "@material-ui/core/colors/blue";
import Layout from "./Layout";
import store from "./store";

const theme = createMuiTheme({
  palette: { primary: blue },
  typography: { useNextVariants: true, h6: { fontWeight: 400 } }
});

ReactDOM.render(
  <Provider store={store}>
    <WebsocketProvider url={"ws://10.91.1.1:4000/data"}>
      <MuiThemeProvider theme={theme}>
        <Layout />
      </MuiThemeProvider>
    </WebsocketProvider>
  </Provider>,
  document.getElementById("root")
);
