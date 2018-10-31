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
