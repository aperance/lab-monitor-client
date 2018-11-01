import * as React from "react";
// @ts-ignore
import { useState, useEffect, useRef } from "react";
// @ts-ignore
import RFB from "@novnc/novnc/core/rfb";

type Vnc = [React.RefObject<HTMLSpanElement>, string];

export function useVnc(
  url: string,
  password: string,
  scaled: boolean,
  suspend: boolean
) {
  const [status, setStatus] = useState("disconnected");
  const targetRef: React.RefObject<HTMLSpanElement> = useRef();

  useEffect(
    () => {
      if (!suspend) {
        disconnectVnc();
        connectVnc();
        return () => disconnectVnc();
      }
    },
    [url, scaled, suspend]
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
    setStatus("disconnected");
  };

  const connectHandler = () => setStatus("connected");
  const disconnectHandler = () => setStatus("error");

  return [targetRef, status] as Vnc;
}
