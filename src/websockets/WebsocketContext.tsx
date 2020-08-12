import * as React from "react";
import {useState, useRef, useEffect} from "react";
import {WsMessage} from "./messageTypes";
import {messageRouter} from "./messageRouter";

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

export const WebsocketProvider = (props: Props) => {
  const [status, setStatus] = useState("disconnected");
  const [retry, setRetry] = useState(false);
  const socket = useRef(null as WebSocket | null);

  useEffect(() => {
    if (!socket.current || retry) {
      const ws = new WebSocket(props.url);

      ws.onopen = () => setStatus("connected");
      ws.onmessage = x => {
        try {
          messageRouter(JSON.parse(x.data));
        } catch (err) {
          console.error(err);
          ws.onclose = null;
          ws.close();
          setStatus("dataError");
        }
      };
      ws.onerror = () => setStatus("connectionError");
      ws.onclose = () => setTimeout(() => setRetry(true), 5000);

      setRetry(false);
      socket.current = ws;
    }
  }, [retry, props.url]);

  const send = (message: WsMessage) => {
    if (socket.current) {
      socket.current.send(JSON.stringify(message));
    }
  };

  return (
    <WebsocketContext.Provider value={{status, send}}>
      {props.children}
    </WebsocketContext.Provider>
  );
};
