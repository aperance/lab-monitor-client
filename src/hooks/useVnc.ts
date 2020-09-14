/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import RFB from "@novnc/novnc/core/rfb";
import { useState, useEffect, useRef } from "react";

/** Shape of useVnc hook return value */
type UseVnc = {
  targetRef: React.MutableRefObject<HTMLSpanElement | null>;
  status: string;
  isFitToWindow: boolean;
  setFitToWindow: (arg0: boolean) => void;
};

/**
 * Custom hook to manage VNC connection to specified device. The data
 * is routed through the VNC proxy feature of the backend server. Data
 * is raw RFB between the backend server and device but wrapped in
 * websocket messages between backend server and client.
 */
export const useVnc = (ipAddress: string, suspend: boolean): UseVnc => {
  const [isFitToWindow, setFitToWindow] = useState(true);
  const [status, setStatus] = useState("disconnected");
  const targetRef = useRef(null as HTMLSpanElement | null);

  /** Reset connection on any state change */
  useEffect(() => {
    disconnectVnc();
    if (suspend === false) {
      connectVnc();
      return () => disconnectVnc();
    }
  }, [ipAddress, isFitToWindow, suspend]);

  let rfb: RFB | null = null;
  let timer: NodeJS.Timeout;

  const url =
    `${process.env.DEMO === "true" ? "wss" : "ws"}://${process.env.BACKEND}` +
    `/vnc?ip=${ipAddress}&port=${process.env.VNC_PORT}`;

  const connectVnc = () => {
    timer = setTimeout(() => {
      rfb = new RFB(targetRef.current, url, {
        credentials: { password: process.env.VNC_PASSWORD }
      });
      rfb.scaleViewport = isFitToWindow;
      rfb.addEventListener("connect", () => setStatus("connected"));
      rfb.addEventListener("disconnect", () => setStatus("error"));
    }, 500);
  };

  const disconnectVnc = () => {
    clearTimeout(timer);
    if (rfb) {
      rfb.removeEventListener("connect", () => setStatus("connected"));
      rfb.removeEventListener("disconnect", () => setStatus("error"));
      if (rfb._rfb_connection_state !== "disconnected") rfb.disconnect();
      rfb = null;
    }
    setStatus("disconnected");
  };

  return { targetRef, status, isFitToWindow, setFitToWindow };
};
