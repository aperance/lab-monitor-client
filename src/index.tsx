import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { WebsocketProvider } from "./websockets/WebsocketContext";
import { ConfigurationProvider } from "./configuration/ConfigurationContext";
import store from "./store";
import AppContainer from "./containers/AppContainer";

ReactDOM.render(
  <Provider store={store}>
    <ConfigurationProvider>
      <WebsocketProvider url={"ws://10.91.1.1:4000/data"}>
        <AppContainer />
      </WebsocketProvider>
    </ConfigurationProvider>
  </Provider>,
  document.getElementById("root")
);
