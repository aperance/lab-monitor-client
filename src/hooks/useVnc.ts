import { useState, useEffect, useContext, useRef } from "react";
import { ConfigurationContext } from "../configuration/ConfigurationContext";
// @ts-ignore
import RFB from "@novnc/novnc/core/rfb";

export const useVnc = (ipAddress: string, suspend: boolean) => {
  const { proxyUrl, port, password } = useContext(ConfigurationContext).vnc;
  const [scaled, setScaled] = useState(true);
  const [status, setStatus] = useState("disconnected");
  const targetRef = useRef(null as HTMLSpanElement | null);

  useEffect(
    () => {
      if (!suspend) {
        disconnectVnc();
        connectVnc();
        return () => disconnectVnc();
      }
    },
    [ipAddress, scaled, suspend]
  );

  let rfb: any = null;
  let timer: any;

  const url = `${proxyUrl}?ip=${ipAddress}&port=${port}`;

  const connectVnc = () => {
    timer = setTimeout(() => {
      rfb = new RFB(targetRef.current, url, {
        credentials: { password }
      });
      rfb.scaleViewport = scaled;
      rfb.addEventListener("connect", connectHandler);
      rfb.addEventListener("disconnect", disconnectHandler);
    }, 500);
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

  return { targetRef, status, scaled, setScaled };
};
