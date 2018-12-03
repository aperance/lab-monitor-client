import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { WebsocketProvider } from "./websockets/WebsocketContext";
import { ConfigurationProvider } from "./configuration/ConfigurationContext";
import blue from "@material-ui/core/colors/blue";
import store from "./store";
import AppContainer from "./containers/AppContainer";

const theme = createMuiTheme({
  palette: { primary: blue },
  typography: { useNextVariants: true, h6: { fontWeight: 400 } }
});

ReactDOM.render(
  <Provider store={store}>
    <ConfigurationProvider>
      <WebsocketProvider url={"ws://10.91.1.1:4000/data"}>
        <MuiThemeProvider theme={theme}>
          <AppContainer />
        </MuiThemeProvider>
      </WebsocketProvider>
    </ConfigurationProvider>
  </Provider>,
  document.getElementById("root")
);
