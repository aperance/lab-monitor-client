import { WsMessageTypeKeys } from "./types";
import {
  isWsMessage,
  isDeviceDataAll,
  isDeviceDataUpdate,
  isDeviceActionResponse,
  isPsToolsResponse
} from "./typeGuards";
import {
  actionResponseSet,
  configuration,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse,
  errorMessageSet
} from "./actions/actionCreators";
import store from "./store";
import websocket from "./websocket";

/**
 * Determine redux action to be dispatched based on an incoming websocket message.
 *
 * @param {unknown} message
 */
// @ts-ignore
export const inboundMessageRouter = (message: unknown) => {
  console.log(message);
  if (!isWsMessage(message)) return;
  const { type, payload } = message;
  switch (type) {
    case WsMessageTypeKeys.Configuration:
      store.dispatch(configuration(payload));
      break;
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
      if (isPsToolsResponse(payload)) store.dispatch(psToolsResponse(payload));
      break;
    default:
      store.dispatch(
        errorMessageSet({
          err: new Error("Invalid WS message type specified")
        })
      );
      break;
  }
};

/**
 * Public method to trigger refresh of device tracking by server.
 *
 * @param {string[]} targets
 */
export const sendRefreshDevice = (targets: string[]) => {
  websocket.sendToServer({
    type: WsMessageTypeKeys.RefreshDevice,
    payload: { targets }
  });
};

/**
 * Public method to trigger removal of device in server records.
 *
 * @param {string[]} targets
 */
export const sendClearDevice = (targets: string[]) => {
  websocket.sendToServer({
    type: WsMessageTypeKeys.ClearDevice,
    payload: { targets }
  });
};

/**
 * Public method to send action request to device via websocket server.
 *
 * @param {string[]} targets
 * @param {string} action
 * @param {object} parameters
 */
export const sendDeviceAction = (
  targets: string[],
  action: string,
  parameters = {}
) => {
  websocket.sendToServer({
    type: WsMessageTypeKeys.DeviceAction,
    payload: { targets, type: action, parameters }
  });
};

/**
 * Public method to send PsTools command to device via websocket server.
 *
 * @param {string} target
 * @param {string} mode
 * @param {string} cmd
 */
export const sendPsToolsCommand = (
  target: string,
  { mode, cmd }: { mode: string; cmd: string }
) => {
  websocket.sendToServer({
    type: WsMessageTypeKeys.PsToolsCommand,
    payload: { target, mode, argument: cmd }
  });
};
