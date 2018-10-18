/** @module WebSocket */

import { WsMessage, WsMessageTypeKeys } from "./types";
import {
  isWsMessage,
  isDeviceDataAll,
  isDeviceDataUpdate,
  isDeviceActionResponse,
  isPsToolsResponse
} from "./typeGuards";
import {
  actionResponseSet,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse,
  errorMessageSet,
  resetAll
} from "./actions/actionCreators";
import store from "./store";

/**
 * Establishes websocket connection to serve, and handles inbound and
 * outbound communication.
 *
 * @param {string} url
 */
class Socket {
  private socket: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  /**
   * Connect (or reconnect) to websocket server.
   */
  public connect() {
    this.socket = new WebSocket(this.url);

    this.socket.addEventListener("open", () => {
      console.log("websocket connected");

      if (this.socket)
        this.socket.onmessage = message => {
          this.messageHandler(JSON.parse(message.data) as unknown);
        };
    });

    this.socket.onclose = () => {
      store.dispatch(resetAll());
      store.dispatch(
        errorMessageSet({
          err: new Error("Disconnected from server")
        })
      );
      setTimeout(this.connect.bind(this), 5000);
    };
  }

  /**
   * Public method to trigger refresh of device tracking by server.
   *
   * @param {string[]} targets
   */
  public sendRefreshDevice(targets: string[]) {
    this.sendToServer({
      type: WsMessageTypeKeys.RefreshDevice,
      payload: { targets }
    });
  }

  /**
   * Public method to send action request to device via websocket server.
   *
   * @param {string[]} targets
   * @param {string} action
   * @param {object} parameters
   */
  public sendDeviceAction(targets: string[], action: string, parameters = {}) {
    this.sendToServer({
      type: WsMessageTypeKeys.DeviceAction,
      payload: { targets, type: action, parameters }
    });
  }

  /**
   * Public method to send PsTools command to device via websocket server.
   *
   * @param {string} target
   * @param {string} mode
   * @param {string} cmd
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
   * Stringify and emit message object to websocket server.
   *
   * @param {WsMessage} message
   */
  private sendToServer(message: WsMessage) {
    if (this.socket) this.socket.send(JSON.stringify(message));
  }

  /**
   * Determine redux action to be dispatched based on an incoming websocket message.
   *
   * @param {unknown} message
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
        store.dispatch(
          errorMessageSet({
            err: new Error("Invalid WS message type specified")
          })
        );
        break;
    }
  }
}

export default new Socket("ws://10.91.1.1:4000/data");
