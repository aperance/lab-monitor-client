import {
  actionResponseSet,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse,
  resetAll
} from "./actions/actionCreators";
import store from "./store";

class Socket {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.start();
  }

  public sendRefreshDevice(targets: string[]) {
    this.socket.send(
      JSON.stringify({ type: "REFRESH_DEVICE", payload: { targets } })
    );
  }

  public sendDeviceAction(targets: string[], action: string, parameters = {}) {
    this.socket.send(
      JSON.stringify({
        type: "DEVICE_ACTION",
        payload: { targets, type: action, parameters }
      })
    );
  }

  public sendPsToolsCommand(
    target: string[],
    { mode, cmd }: { mode: string; cmd: string }
  ) {
    this.socket.send(
      JSON.stringify({
        type: "PSTOOLS_COMMAND",
        payload: { target, mode, argument: cmd }
      })
    );
  }

  private start() {
    this.socket.addEventListener("open", () => {
      console.log("websocket connected");
      this.socket.addEventListener("message", message => {
        console.log(message.data);

        const { type, payload } = JSON.parse(message.data);
        switch (type) {
          case "DEVICE_DATA_ALL":
            store.dispatch(deviceDataAll(payload));
            break;
          case "DEVICE_DATA_UPDATE":
            store.dispatch(deviceDataUpdate(payload));
            break;
          case "DEVICE_ACTION_RESPONSE":
            if (payload.err) console.log(payload.err);
            if (payload.results)
              store.dispatch(actionResponseSet(payload.results));
            break;
          case "PSTOOLS_COMMAND_RESPONSE":
            store.dispatch(psToolsResponse(payload));
            break;
          default:
            break;
        }
      });
    });

    this.socket.addEventListener("close", () => {
      console.log("websocket closed");
      store.dispatch(resetAll());
      setTimeout(this.start.bind(this), 5000);
    });
  }
}

export default new Socket("ws://10.91.1.1:4000/data");
