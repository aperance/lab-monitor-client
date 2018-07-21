import {
  actionResponseSet,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse,
  resetAll
} from "./actions/actionCreators";
import store from "./store";

interface IMessage {
  type: MessageType;
  payload: {
    [key: string]: any;
  };
}

enum MessageType {
  DeviceDataAll = "DEVICE_DATA_ALL",
  DeviceDataUpdate = "DEVICE_DATA_UPDATE",
  RefreshDevice = "REFRESH_DEVICE",
  DeviceAction = "DEVICE_ACTION",
  DeviceActionResponse = "DEVICE_ACTION_RESPONSE",
  PsToolsCommand = "PSTOOLS_COMMAND",
  PsToolsCommandResponse = "PSTOOLS_COMMAND_RESPONSE",
  UserDialog = "USER_DIALOG",
  Error = "ERROR"
}

class Socket {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.start();
  }

  public sendRefreshDevice(targets: string[]) {
    this.sendToServer({
      type: MessageType.RefreshDevice,
      payload: { targets }
    });
  }

  public sendDeviceAction(targets: string[], action: string, parameters = {}) {
    this.sendToServer({
      type: MessageType.DeviceAction,
      payload: { targets, type: action, parameters }
    });
  }

  public sendPsToolsCommand(
    target: string[],
    { mode, cmd }: { mode: string; cmd: string }
  ) {
    this.sendToServer({
      type: MessageType.PsToolsCommand,
      payload: { target, mode, argument: cmd }
    });
  }

  private start() {
    this.socket.addEventListener("open", () => {
      console.log("websocket connected");
      this.socket.addEventListener("message", message => {
        console.log(message.data);
        const { type, payload } = JSON.parse(message.data);
        if (
          typeof type !== "string" ||
          typeof payload !== "object" ||
          payload === null
        ) {
          console.error("WS message received with unexpected structure.");
          return;
        }
        switch (type) {
          case MessageType.DeviceDataAll:
            if (
              typeof payload.state !== "object" ||
              typeof payload.history !== "object"
            )
              console.error("Inavlid device data: " + payload);
            else store.dispatch(deviceDataAll(payload.state, payload.history));
            break;
          case MessageType.DeviceDataUpdate:
            if (
              typeof payload.id !== "string" ||
              typeof payload.state !== "object" ||
              typeof payload.history !== "object"
            )
              console.error("Inavlid device data: " + payload);
            else
              store.dispatch(
                deviceDataUpdate(payload.id, payload.state, payload.history)
              );
            break;
          case MessageType.DeviceActionResponse:
            if (
              (payload.err !== null && payload.err !== Error) ||
              payload.result === undefined
            )
              console.error("Inavlid device action response: " + payload);
            else store.dispatch(actionResponseSet(payload.err, payload.result));
            break;
          case MessageType.PsToolsCommandResponse:
            if (
              (payload.err !== null && payload.err !== Error) ||
              (payload.result !== null && typeof payload.result !== "string")
            )
              console.error("Inavlid psTools response: " + payload);
            else store.dispatch(psToolsResponse(payload.err, payload.result));
            break;
          default:
            console.error("Invalid WS message type specified");
            break;
        }
        if (payload.err) console.log(payload.err);
      });
    });

    this.socket.addEventListener("close", () => {
      console.log("websocket closed");
      store.dispatch(resetAll());
      setTimeout(this.start.bind(this), 5000);
    });
  }

  private sendToServer(message: IMessage) {
    this.socket.send(JSON.stringify(message));
  }
}

export default new Socket("ws://10.91.1.1:4000/data");
