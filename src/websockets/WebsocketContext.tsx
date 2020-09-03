import React, { useState, useRef, useEffect } from "react";
import { object, string, array, record, tuple, boolean } from "zod";
import { useDispatch } from "../redux/store";
import {
  deviceCommandResponse,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse
} from "../redux/actionCreators";
import { WsMessage, WsMessageTypeKeys } from "./messageTypes";

export const WebsocketContext = React.createContext(
  {} as {
    status: string;
    send: (message: WsMessage) => void;
  }
);

interface Props {
  children: JSX.Element;
}

export const WebsocketProvider = (props: Props): JSX.Element => {
  const [status, setStatus] = useState("disconnected");
  const [retry, setRetry] = useState(false);
  const socket = useRef(null as WebSocket | null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket.current || retry) {
      const ws = new WebSocket(
        `${process.env.DEMO === "true" ? "wss" : "ws"}://` +
          `${process.env.BACKEND}/data`
      );

      ws.onopen = () => setStatus("connected");
      ws.onerror = () => setStatus("connectionError");
      ws.onclose = () => setTimeout(() => setRetry(true), 5000);

      ws.onmessage = ({ data }) => {
        try {
          const { type, payload } = JSON.parse(data);

          switch (type) {
            case WsMessageTypeKeys.DeviceDataAll: {
              const schema = object({
                state: record(record(string())),
                history: record(
                  record(array(tuple([string(), string().nullable()])))
                )
              });

              const validPayload = schema.parse(payload);
              dispatch(deviceDataAll(validPayload));
              break;
            }

            case WsMessageTypeKeys.DeviceDataUpdate: {
              const schema = object({
                id: string(),
                state: record(string().nullable()).nullable(),
                history: array(
                  tuple([string(), tuple([string(), string().nullable()])])
                ).nullable()
              });

              const validPayload = schema.parse(payload);
              dispatch(deviceDataUpdate(validPayload));
              break;
            }

            case WsMessageTypeKeys.DeviceActionResponse: {
              const schema = object({
                err: string().nullable(),
                ack: boolean().nullable()
              });

              const validPayload = schema.parse(payload);
              dispatch(deviceCommandResponse(validPayload));
              break;
            }

            case WsMessageTypeKeys.PsToolsCommandResponse: {
              const schema = object({ result: string() });

              const validPayload = schema.parse(payload);
              dispatch(psToolsResponse(validPayload));
              break;
            }

            case WsMessageTypeKeys.Error:
              console.error(payload);
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
  }, [retry, dispatch]);

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
