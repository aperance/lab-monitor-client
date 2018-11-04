import * as React from "react";
// @ts-ignore
import { useState, useRef, useEffect } from "react";
import store from "./store";
import { WsMessageTypeKeys, WsMessage } from "./types";
import { useWebsocket } from "./hooks/useWebsocket";
import {
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
  psToolsResponse
} from "./actions/actionCreators";

export const WebsocketContext = React.createContext({});

interface Props {
  url: string;
  children: JSX.Element;
}

const WebsocketProvider = (props: Props) => {
  const [status, sendToServer] = useWebsocket(props.url, inboundMessageRouter);

  return (
    <WebsocketContext.Provider value={{ status, sendToServer }}>
      {props.children}
    </WebsocketContext.Provider>
  );
};

const inboundMessageRouter = ({ type, payload }: WsMessage) => {
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

export default WebsocketProvider;
