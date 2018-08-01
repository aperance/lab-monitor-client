import {
  actionResponseSet,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse,
  resetAll
} from "./actions/actionCreators";
import store from "./store";
import {
  WsMessage,
  WsMessageTypeKeys,
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  DeviceActionResponse
} from "./types";

/**
 *
 */
class Socket {
  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);

    this.socket.addEventListener("open", () => {
      console.log("websocket connected");
      this.socket.addEventListener("message", message => {
        // @ts-ignore
        this.messageHandler(JSON.parse(message.data) as unknown);
      });
    });

    this.socket.addEventListener("close", () => {
      console.log("websocket closed");
      store.dispatch(resetAll());
      // setTimeout(this.start.bind(this), 5000);
    });
  }

  /**
   *
   */
  public sendRefreshDevice(targets: string[]) {
    this.sendToServer({
      type: WsMessageTypeKeys.RefreshDevice,
      payload: { targets }
    });
  }

  /**
   *
   */
  public sendDeviceAction(targets: string[], action: string, parameters = {}) {
    this.sendToServer({
      type: WsMessageTypeKeys.DeviceAction,
      payload: { targets, type: action, parameters }
    });
  }

  /**
   *
   */
  public sendPsToolsCommand(
    target: string,
    { mode, cmd }: { mode: string; cmd: string }
  ) {
    this.sendToServer({
      type: WsMessageTypeKeys.PsToolsCommand,
      payload: { target, mode, argument: cmd }
    });
  }

  /**
   *
   */
  private sendToServer(message: WsMessage) {
    this.socket.send(JSON.stringify(message));
  }

  /**
   *
   */
  // @ts-ignore
  private messageHandler(message: unknown) {
    console.log(message);
    if (!isWsMessage(message)) return;
    const { type, payload } = message;
    switch (type) {
      case WsMessageTypeKeys.DeviceDataAll:
        if (isDeviceDataAll(payload)) store.dispatch(deviceDataAll(payload));
        break;
      case WsMessageTypeKeys.DeviceDataUpdate:
        if (isDeviceDataUpdate(payload))
          store.dispatch(deviceDataUpdate(payload));
        break;
      case WsMessageTypeKeys.DeviceActionResponse:
        if (isDeviceActionResponse(payload))
          store.dispatch(actionResponseSet(payload));
        break;
      case WsMessageTypeKeys.PsToolsCommandResponse:
        if (isPsToolsResponse(payload))
          store.dispatch(psToolsResponse(payload));
        break;
      default:
        console.error("Invalid WS message type specified");
        break;
    }
  }
}

const isWsMessage = (message: any): message is WsMessage => {
  if (
    typeof message.type === "string" &&
    typeof message.payload === "object" &&
    message.payload !== null
  )
    return true;
  else {
    console.error("WS message received with unexpected structure.");
    return false;
  }
};

const isDeviceDataAll = (payload: any): payload is DeviceDataAll => {
  if (payload) return true;
  else {
    console.error("Invalid device data received.");
    return false;
  }
};

const isDeviceDataUpdate = (payload: any): payload is DeviceDataUpdate => {
  if (payload) return true;
  else {
    console.error("Invalid device data received.");
    return false;
  }
};

const isPsToolsResponse = (payload: any): payload is PsToolsResponse => {
  if (payload) return true;
  else {
    console.error("Invalid response received.");
    return false;
  }
};

const isDeviceActionResponse = (
  payload: any
): payload is DeviceActionResponse => {
  if (payload) return true;
  else {
    console.error("Invalid response received.");
    return false;
  }
};

export default new Socket("ws://10.91.1.1:4000/data");
