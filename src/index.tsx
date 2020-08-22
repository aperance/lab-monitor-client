import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";
import {WebsocketProvider} from "./websockets/WebsocketContext";
import App from "./components/App";

const theme = createMuiTheme({
  palette: {primary: blue}
});

ReactDOM.render(
  <Provider store={store}>
    <WebsocketProvider url={`${process.env.BACKEND}/data`}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </WebsocketProvider>
  </Provider>,
  document.getElementById("root")
);
