import * as React from "react";
// @ts-ignore
import { useState, useRef, useEffect } from "react";
import store from "./store";
import { WsMessageTypeKeys, WsMessage } from "./types";

import { isWsMessage } from "./typeGuards";
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

export const WebsocketProvider = (props: Props) => {
  const [status, setStatus] = useState("disconnected");
  const [retry, setRetry] = useState(false);
  const socket = useRef(null);

  useEffect(
    () => {
      if (!socket.current || retry) {
        const ws = new WebSocket(props.url);

        ws.onopen = () => setTimeout(() => setStatus("connected"), 500);
        ws.onmessage = x => {
          const message = JSON.parse(x.data);
          console.log(message);
          if (!isWsMessage(message))
            throw Error("Invalid WS message type specified");
          inboundMessageRouter(message);
        };
        ws.onerror = () => setStatus("error");
        ws.onclose = () => setTimeout(() => setRetry(true), 5000);

        setRetry(false);
        socket.current = ws;
      }
    },
    [retry]
  );

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
        if (isPsToolsResponse(payload))
          store.dispatch(psToolsResponse(payload));
        break;
      default:
        throw Error("Invalid WS message type specified");
    }
  };

  const send = (message: WsMessage) => {
    if (socket.current) {
      socket.current.send(JSON.stringify(message));
    }
  };

  return (
    <WebsocketContext.Provider value={{ status, send }}>
      {props.children}
    </WebsocketContext.Provider>
  );
};
