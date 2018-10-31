import * as React from "react";
// @ts-ignore
import { useState, useRef, useEffect } from "react";
import { WsMessage, WsMessageTypeKeys } from "./types";
import { inboundMessageRouter } from "./messageHandler";

export const WebsocketContext = React.createContext({});

interface Props {
  url: string;
  children: JSX.Element;
}

export const WebsocketProvider = (props: Props) => {
  const [status, setStatus] = useState("connecting");
  const [retry, setRetry] = useState(false);
  const socket = useRef(null);

  useEffect(
    () => {
      if (!socket.current || retry) {
        const ws = new WebSocket(props.url);

        ws.addEventListener("open", () => {
          setStatus("connected");
          ws.onmessage = message => {
            inboundMessageRouter(JSON.parse(message.data) as unknown);
          };
        });

        ws.onclose = () => {
          setStatus("disconnected");
          setTimeout(() => setRetry(true), 5000);
        };

        socket.current = ws;
        setRetry(false);
      }
    },
    [retry]
  );

  // const connect = () => {
  //   const ws = new WebSocket(props.url);

  //   ws.addEventListener("open", () => {
  //     setStatus("connected");
  //     ws.onmessage = message => {
  //       inboundMessageRouter(JSON.parse(message.data) as unknown);
  //     };
  //   });

  //   ws.onclose = () => {
  //     setStatus("disconnected");
  //     setTimeout(() => setRetry(true), 5000);
  //   };

  //   return ws;
  // };

  const sendToServer = (message: WsMessage) => {
    if (socket.current) {
      console.log("Send to server");
      socket.current.send(JSON.stringify(message));
    }
  };

  /**
   * Public method to trigger refresh of device tracking by server.
   *
   * @param {string[]} targets
   */
  const sendRefreshDevice = (targets: string[]) => {
    console.log("refresh device");

    sendToServer({
      type: WsMessageTypeKeys.RefreshDevice,
      payload: { targets }
    });
  };

  /**
   * Public method to trigger removal of device in server records.
   *
   * @param {string[]} targets
   */
  const sendClearDevice = (targets: string[]) => {
    sendToServer({
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
  const sendDeviceAction = (
    targets: string[],
    action: string,
    parameters = {}
  ) => {
    sendToServer({
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
  const sendPsToolsCommand = (
    target: string,
    { mode, cmd }: { mode: string; cmd: string }
  ) => {
    sendToServer({
      type: WsMessageTypeKeys.PsToolsCommand,
      payload: { target, mode, argument: cmd }
    });
  };

  return (
    <WebsocketContext.Provider
      value={{
        status,
        sendRefreshDevice,
        sendClearDevice,
        sendDeviceAction,
        sendPsToolsCommand
      }}
    >
      {props.children}
    </WebsocketContext.Provider>
  );
};
