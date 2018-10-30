import * as React from "react";
// @ts-ignore
import { useState, useEffect, useRef } from "react";
// @ts-ignore
import RFB from "@novnc/novnc/core/rfb";

type Vnc = [React.RefObject<HTMLSpanElement>, boolean, Error | null];

export function useVnc(url: string, password: string, scaled: boolean) {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);
  const targetRef: React.RefObject<HTMLSpanElement> = useRef();

  useEffect(
    () => {
      disconnectVnc();
      connectVnc();
      return () => disconnectVnc();
    },
    [url, scaled]
  );

  let rfb: any = null;
  let timer: any;

  const connectVnc = () => {
    timer = setTimeout(() => {
      rfb = new RFB(targetRef.current, url, {
        credentials: { password }
      });
      rfb.scaleViewport = scaled;
      rfb.addEventListener("connect", connectHandler);
      rfb.addEventListener("disconnect", disconnectHandler);
    }, 100);
  };

  const disconnectVnc = () => {
    clearTimeout(timer);
    if (rfb) {
      rfb.removeEventListener("connect", connectHandler);
      rfb.removeEventListener("disconnect", disconnectHandler);
      if (rfb._rfb_connection_state !== "disconnected") rfb.disconnect();
      rfb = null;
    }
    setConnected(false);
    setError(null);
  };

  const connectHandler = () => setConnected(true);

  const disconnectHandler = () => {
    setConnected(false);
    setError(Error("VNC connection failed."));
  };

  return [targetRef, connected, error] as Vnc;
}
