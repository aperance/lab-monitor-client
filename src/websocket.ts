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
        this.messageHandler(message.data);
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
      type: MessageType.RefreshDevice,
      payload: { targets }
    });
  }

  /**
   *
   */
  public sendDeviceAction(targets: string[], action: string, parameters = {}) {
    this.sendToServer({
      type: MessageType.DeviceAction,
      payload: { targets, type: action, parameters }
    });
  }

  /**
   *
   */
  public sendPsToolsCommand(
    target: string[],
    { mode, cmd }: { mode: string; cmd: string }
  ) {
    this.sendToServer({
      type: MessageType.PsToolsCommand,
      payload: { target, mode, argument: cmd }
    });
  }

  /**
   *
   */
  private messageHandler(message: any) {
    console.log(message);
    const { type, payload } = JSON.parse(message);
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
        this.deviceDataAllHandler(payload);
        break;
      case MessageType.DeviceDataUpdate:
        this.deviceDataUpdateHandler(payload);
        break;
      case MessageType.DeviceActionResponse:
        this.deviceActionResponseHandler(payload);
        break;
      case MessageType.PsToolsCommandResponse:
        this.psToolsCommandResponseHandler(payload);
        break;
      default:
        console.error("Invalid WS message type specified");
        break;
    }
  }

  /**
   *
   */
  private deviceDataAllHandler(data: any) {
    const isValidState = Object.values(data.state).every(oneDeep => {
      if (typeof oneDeep !== "object") return false;
      return Object.values(oneDeep).every(twoDeep => {
        if (typeof twoDeep !== "string") return false;
        else return true;
      });
    });

    if (isValidState) store.dispatch(deviceDataAll(data.state, data.history));
    else console.error("Invalid device data received.");
  }

  /**
   *
   */
  private deviceDataUpdateHandler(data: any) {
    // if (
    //   typeof data.id !== "string" ||
    //   typeof data.state !== "object" ||
    //   typeof data.history !== "object"
    // )
    //   console.error("Inavlid device data: " + data);
    // else
    store.dispatch(deviceDataUpdate(data.id, data.state, data.history));
  }

  /**
   *
   */
  private deviceActionResponseHandler(data: any) {
    if ((data.err !== null && data.err !== Error) || data.result === undefined)
      console.error("Inavlid device action response: " + data);
    else store.dispatch(actionResponseSet(data.err, data.result));
  }

  /**
   *
   */
  private psToolsCommandResponseHandler(data: any) {
    if (
      (data.err !== null && data.err !== Error) ||
      (data.result !== null && typeof data.result !== "string")
    )
      console.error("Inavlid psTools response: " + data);
    else store.dispatch(psToolsResponse(data.err, data.result));
  }

  /**
   *
   */
  private sendToServer(message: IMessage) {
    this.socket.send(JSON.stringify(message));
  }
}

export default new Socket("ws://10.91.1.1:4000/data");
