/** @module websocket */

import {
  WsMessage,
  WsMessageTypeKeys,
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  DeviceActionResponse
} from "./types";
import {
  actionResponseSet,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse,
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
        this.socket.addEventListener("message", message => {
          // @ts-ignore
          this.messageHandler(JSON.parse(message.data) as unknown);
        });
    });

    this.socket.addEventListener("close", () => {
      console.log("websocket closed. Retrying in 5 sec...");
      store.dispatch(resetAll());
      setTimeout(this.connect.bind(this), 5000);
    });
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
        console.error("Invalid WS message type specified");
        break;
    }
  }
}

/**
 * Type Guards
 */

/**
 * Type guard for WsMessage interface
 *
 * @param {any} message
 * @returns {boolean}
 */
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

// TODO: Complete type guards

/**
 * Type guard for DeviceDataAll interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
const isDeviceDataAll = (payload: any): payload is DeviceDataAll => {
  if (payload) return true;
  else {
    console.error("Invalid device data received.");
    return false;
  }
};

/**
 * Type guard for DeviceDataUpdate interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
const isDeviceDataUpdate = (payload: any): payload is DeviceDataUpdate => {
  if (payload) return true;
  else {
    console.error("Invalid device data received.");
    return false;
  }
};

/**
 * Type guard for PsToolsResponse interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
const isPsToolsResponse = (payload: any): payload is PsToolsResponse => {
  if (payload) return true;
  else {
    console.error("Invalid response received.");
    return false;
  }
};

/**
 * Type guard for DeviceActionResponse interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
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
