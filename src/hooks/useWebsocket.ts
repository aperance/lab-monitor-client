// @ts-ignore
import { useState, useRef, useEffect } from "react";
import { WsMessage } from "../types";

export const useWebsocket = (
  url: string,
  inboundMessageHandler: (message: unknown) => void
) => {
  const [status, setStatus] = useState("disconnected");
  const [retry, setRetry] = useState(false);
  const socket = useRef(null);

  useEffect(
    () => {
      if (!socket.current || retry) {
        const ws = new WebSocket(url);

        ws.onopen = () => setTimeout(() => setStatus("connected"), 500);
        ws.onmessage = x => inboundMessageHandler(JSON.parse(x.data));
        ws.onerror = () => setStatus("error");
        ws.onclose = () => setTimeout(() => setRetry(true), 5000);

        setRetry(false);
        socket.current = ws;
      }
    },
    [retry]
  );

  const outboundMessageHandler = (message: WsMessage) => {
    if (socket.current) {
      socket.current.send(JSON.stringify(message));
    }
  };

  return [status, outboundMessageHandler];
};
