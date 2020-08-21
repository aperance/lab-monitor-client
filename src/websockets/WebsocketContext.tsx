import React, {useState, useRef, useEffect} from "react";
import {useDispatch} from "../redux/store";
import {
  deviceCommandResponse,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse
} from "../redux/actionCreators";
import {WsMessage, WsMessageTypeKeys} from "./messageTypes";
import {
  isDeviceDataAll,
  isDeviceDataUpdate,
  isDeviceActionResponse,
  isPsToolsResponse
} from "./messageTypeGuards";

export const WebsocketContext = React.createContext(
  {} as {
    status: string;
    send: (message: WsMessage) => void;
  }
);

interface Props {
  url: string;
  children: JSX.Element;
}

export const WebsocketProvider = (props: Props): JSX.Element => {
  const [status, setStatus] = useState("disconnected");
  const [retry, setRetry] = useState(false);
  const socket = useRef(null as WebSocket | null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket.current || retry) {
      const ws = new WebSocket(props.url);

      ws.onopen = () => setStatus("connected");
      ws.onerror = () => setStatus("connectionError");
      ws.onclose = () => setTimeout(() => setRetry(true), 5000);

      ws.onmessage = ({data}) => {
        try {
          const {type, payload} = JSON.parse(data);

          switch (type) {
            case WsMessageTypeKeys.DeviceDataAll:
              if (!isDeviceDataAll(payload))
                throw Error(`Websocket message failed validation`);
              dispatch(deviceDataAll(payload));
              break;
            case WsMessageTypeKeys.DeviceDataUpdate:
              if (!isDeviceDataUpdate(payload))
                throw Error(`Websocket message failed validation`);
              dispatch(deviceDataUpdate(payload));
              break;
            case WsMessageTypeKeys.DeviceActionResponse:
              if (!isDeviceActionResponse(payload))
                throw Error(`Websocket message failed validation`);
              dispatch(deviceCommandResponse(payload));
              break;
            case WsMessageTypeKeys.PsToolsCommandResponse:
              if (!isPsToolsResponse(payload))
                throw Error(`Websocket message failed validation`);
              dispatch(psToolsResponse(payload));
              break;
            default:
              throw Error("Invalid websocket message type specified");
          }
        } catch (err) {
          console.error(err);
          ws.onclose = null;
          ws.close();
          setStatus("dataError");
        }
      };

      setRetry(false);
      socket.current = ws;
    }
  }, [retry, props.url, dispatch]);

  return (
    <WebsocketContext.Provider
      value={{
        status,
        send: (message: WsMessage) =>
          socket.current?.send(JSON.stringify(message))
      }}
    >
      {props.children}
    </WebsocketContext.Provider>
  );
};
