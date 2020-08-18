import store from "../redux/store";
import {WsMessageTypeKeys} from "./messageTypes";
import {
  isWsMessage,
  isDeviceDataAll,
  isDeviceDataUpdate,
  isDeviceActionResponse,
  isPsToolsResponse
} from "./messageTypeGuards";
import {
  deviceCommandResponse,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse
} from "../redux/actionCreators";

export const messageRouter = (message: unknown) => {
  if (!isWsMessage(message)) throw Error("Invalid WS message type specified");

  const {type, payload} = message;

  const errorMessage = `Websocket message failed validation (type: ${type})`;

  switch (type) {
    case WsMessageTypeKeys.DeviceDataAll:
      if (!isDeviceDataAll(payload)) throw Error(errorMessage);
      store.dispatch(deviceDataAll(payload));
      break;
    case WsMessageTypeKeys.DeviceDataUpdate:
      if (!isDeviceDataUpdate(payload)) throw Error(errorMessage);
      store.dispatch(deviceDataUpdate(payload));
      break;
    case WsMessageTypeKeys.DeviceActionResponse:
      if (!isDeviceActionResponse(payload)) throw Error(errorMessage);
      store.dispatch(deviceCommandResponse(payload));
      break;
    case WsMessageTypeKeys.PsToolsCommandResponse:
      if (!isPsToolsResponse(payload)) throw Error(errorMessage);
      store.dispatch(psToolsResponse(payload));
      break;
    default:
      throw Error("Invalid websocket message type specified");
  }
};
