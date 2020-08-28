/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
//@ts-ignore
import RFB from "@novnc/novnc/core/rfb";

import config from "../configuration/configuration";

export const useVnc = (ipAddress: string, suspend: boolean) => {
  const [scaled, setScaled] = useState(true);
  const [status, setStatus] = useState("disconnected");
  const targetRef = useRef(null as HTMLSpanElement | null);

  const { port, password } = config.vnc;

  useEffect(() => {
    if (!suspend) {
      disconnectVnc();
      connectVnc();
      return () => disconnectVnc();
    }
  }, [ipAddress, scaled, suspend]);

  let rfb: any = null;
  let timer: any;

  const url = `${process.env.VNC_PROXY}?ip=${ipAddress}&port=${port}`;

  const connectVnc = () => {
    timer = setTimeout(() => {
      rfb = new RFB(targetRef.current, url, {
        credentials: { password },
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
