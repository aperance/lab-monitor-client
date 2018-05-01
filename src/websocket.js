import store from "./store.js";
import {
  configuration,
  deviceDataAll,
  deviceDataUpdate,
  resetAll,
  psToolsResponse,
  actionResponseSet
} from "./actions/actionCreators";

class Socket {
  constructor(url) {
    this._socket = null;
    this._url = url;
    this._start();
  }

  _start() {
    this._socket = new WebSocket(this._url);

    this._socket.addEventListener("open", () => {
      console.log("websocket connected");
      this._socket.addEventListener("message", message => {
        const data = JSON.parse(message.data);
        switch (data.type) {
          case "CONFIGURATION":
            store.dispatch(configuration(data));
            break;
          case "DEVICE_DATA_ALL":
            store.dispatch(deviceDataAll(data));
            break;
          case "DEVICE_DATA_UPDATE":
            store.dispatch(deviceDataUpdate(data));
            break;
          case "DEVICE_ACTION_RESPONSE":
            store.dispatch(actionResponseSet(data.result));
            break;
          case "PSTOOLS_COMMAND_RESPONSE":
            store.dispatch(psToolsResponse(data.result));
            break;
          default:
            break;
        }
      });
    });

    this._socket.addEventListener("close", () => {
      console.log("websocket closed");
      store.dispatch(resetAll());
      setTimeout(this._start.bind(this), 5000);
    });
  }

  sendDeviceAction(targets, action, parameters = {}) {
    this._socket.send(
      JSON.stringify({ type: "DEVICE_ACTION", targets, action, parameters })
    );
  }

  sendPsToolsCommand(target, { mode, cmd }) {
    this._socket.send(
      JSON.stringify({ type: "PSTOOLS_COMMAND", target, mode, cmd })
    );
  }
}

export default new Socket("ws://10.91.1.1:4000/data");
