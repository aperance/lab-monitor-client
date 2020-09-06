import React, { useState, useRef, useEffect } from "react";
import { object, string, array, record, tuple, boolean } from "zod";
import { useDispatch } from "../redux/store";
import {
  deviceCommandResponse,
  deviceDataAll,
  deviceDataUpdate,
  psToolsResponse
} from "../redux/actionCreators";

export enum WsMessageTypeKeys {
  DeviceDataAll = "DEVICE_DATA_ALL",
  DeviceDataUpdate = "DEVICE_DATA_UPDATE",
  RefreshDevice = "REFRESH_DEVICE",
  RefreshDeviceAll = "REFRESH_DEVICE_ALL",
  ClearDevice = "CLEAR_DEVICE",
  ClearDeviceAll = "CLEAR_DEVICE_ALL",
  DeviceAction = "DEVICE_ACTION",
  DeviceActionResponse = "DEVICE_ACTION_RESPONSE",
  PsToolsCommand = "PSTOOLS_COMMAND",
  PsToolsCommandResponse = "PSTOOLS_COMMAND_RESPONSE",
  UserDialog = "USER_DIALOG",
  Error = "ERROR"
}

type WsMessage = {
  type: WsMessageTypeKeys;
  payload?: unknown;
};

type Props = { children: JSX.Element };

/**
 * React Context that provides child components access to the websocket
 * connection status as well as all available outgoing ws message creators.
 */
export const WebsocketContext = React.createContext(
  {} as {
    status: string;
    psToolsRequest: (target: string, mode: string, argument: string) => void;
    commandRequest: (
      targets: string[],
      type: string,
      parameters?: { namespace: string; level: string }
    ) => void;
    refreshDevice: (targets?: string[]) => void;
    clearDevice: (targets?: string[]) => void;
  }
);

/**
 * Provider component for WebsocketContext.
 * Manages websocket connection state and inbound ws message routing.
 */
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
              const validPayload = validateDeviceDataAll(payload);
              dispatch(deviceDataAll(validPayload));
              break;
            }

            case WsMessageTypeKeys.DeviceDataUpdate: {
              const validPayload = validateDeviceDataUpdate(payload);
              dispatch(deviceDataUpdate(validPayload));
              break;
            }

            case WsMessageTypeKeys.DeviceActionResponse: {
              const validPayload = validateDeviceActionResponse(payload);
              dispatch(deviceCommandResponse(validPayload));
              break;
            }

            case WsMessageTypeKeys.PsToolsCommandResponse: {
              const validPayload = validatePsToolsCommandResponse(payload);
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

  const send = (message: WsMessage) =>
    socket.current?.send(JSON.stringify(message));

  return (
    <WebsocketContext.Provider
      value={{
        status,

        /** Request server to send a remote command to device using PSTools utilities. */
        psToolsRequest: (target: string, mode: string, argument: string) =>
          send({
            type: WsMessageTypeKeys.PsToolsCommand,
            payload: { target, mode, argument }
          }),

        /** Request server to send a remote command to device using its REST endpoints. */
        commandRequest: (
          targets: string[],
          type: string,
          parameters?: { namespace: string; level: string }
        ) =>
          send({
            type: WsMessageTypeKeys.DeviceAction,
            payload: { targets, type, parameters }
          }),

        /** Request server to refresh polling of device. */
        refreshDevice: (targets?: string[]) =>
          send({
            type: WsMessageTypeKeys.RefreshDevice,
            payload: { targets }
          }),

        /** Request server to erase device state from memory. */
        clearDevice: (targets?: string[]) =>
          send({
            type: WsMessageTypeKeys.ClearDevice,
            payload: { targets }
          })
      }}
    >
      {props.children}
    </WebsocketContext.Provider>
  );
};

/**
 * Inbound WS message validation functions
 */

const validateDeviceDataAll = (payload: unknown) => {
  const schema = object({
    state: record(record(string())),
    history: record(record(array(tuple([string(), string().nullable()]))))
  });
  return schema.parse(payload);
};

const validateDeviceDataUpdate = (payload: unknown) => {
  const schema = object({
    id: string(),
    state: record(string().nullable()).nullable(),
    history: array(
      tuple([string(), tuple([string(), string().nullable()])])
    ).nullable()
  });
  return schema.parse(payload);
};

const validateDeviceActionResponse = (payload: unknown) => {
  const schema = object({
    err: string().nullable(),
    ack: boolean().nullable()
  });
  return schema.parse(payload);
};

const validatePsToolsCommandResponse = (payload: unknown) => {
  const schema = object({ result: string() });
  return schema.parse(payload);
};
