import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { WsMessage } from "./messageTypes";
import { messageRouter } from "./messageRouter";
import { isWsMessage } from "./messageTypeGuards";

export const WebsocketContext = React.createContext({} as {
  status: string;
  send: (message: WsMessage) => void;
});

interface Props {
  url: string;
  children: JSX.Element;
}

export const WebsocketProvider = (props: Props) => {
  const [status, setStatus] = useState("disconnected");
  const [retry, setRetry] = useState(false);
  const socket = useRef(null as WebSocket | null);

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
          messageRouter(message);
        };
        ws.onerror = () => setStatus("error");
        ws.onclose = () => setTimeout(() => setRetry(true), 5000);

        setRetry(false);
        socket.current = ws;
      }
    },
    [retry]
  );

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
