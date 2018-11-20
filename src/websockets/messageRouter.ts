import store from "../store";
import { WsMessageTypeKeys, WsMessage } from "./messageTypes";
import {
  isDeviceDataAll,
  isDeviceDataUpdate,
  isDeviceActionResponse,
  isPsToolsResponse
} from "./messageTypeGuards";
import {
  actionResponseSet,
  configuration,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse
} from "../actions/actionCreators";

export const messageRouter = ({ type, payload }: WsMessage) => {
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
      throw Error("Invalid WS message type specified");
  }
};
