import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./store/store";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";
import {WebsocketProvider} from "./websockets/WebsocketContext";
import {ConfigurationProvider} from "./configuration/ConfigurationContext";
import App from "./components/App";

const theme = createMuiTheme({
  palette: {primary: blue}
});

ReactDOM.render(
  <Provider store={store}>
    <ConfigurationProvider>
      <WebsocketProvider url={`ws://${process.env.BACKEND}:4000/data`}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </WebsocketProvider>
    </ConfigurationProvider>
  </Provider>,
  document.getElementById("root")
);
