/**
 *
 * @packageDocumentation
 */

import React from "react";
import { Fab, makeStyles } from "@material-ui/core";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";

import { useSelector } from "../redux/store";
import { useVnc } from "../hooks/useVnc";
import Spinner from "./Spinner";

type StyleProps = {
  connected: boolean;
};

/**  CSS-in-JS styling */
const useStyles = makeStyles({
  root: {
    height: "100%",
    backgroundColor: "rgb(40, 40, 40)",
    "& > div:last-child": {
      height: "100%",
      visibility: (props: StyleProps) =>
        props.connected ? "visible" : "hidden"
    }
  },
  buttonOne: {
    position: "absolute",
    right: "18px",
    top: "18px",
    backgroundColor: "white",
    opacity: 0.5
  },
  buttonTwo: {
    position: "absolute",
    right: "18px",
    top: "72px",
    backgroundColor: "white",
    opacity: 0.5
  },
  errorDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    "& > p": {
      color: "white",
      width: "350px"
    }
  }
});

const VncViewer = (): JSX.Element => {
  /** IP Address of the target device. */
  const ipAddress = useSelector((state) =>
    process.env.DEMO === "true"
      ? process.env.VNC_DEMO_IP || ""
      : state.userSelection.rows[0] ?? ""
  );
  /** Used to determine if vnc area needs to be resized. */
  const isDragging = useSelector((state) => state.userSelection.dragging);
  const { targetRef, status, scaled, setScaled } = useVnc(
    ipAddress,
    isDragging
  );
  /** Generated CSS class names */
  const classes = useStyles({ connected: status === "connected" });

  return (
    <div className={classes.root}>
      {status === "disconnected" && <Spinner />}
      {status === "error" && (
        <div className={classes.errorDiv}>
          <p>
            Unable to establish VNC connection. Make sure VNC server is running
            on the target device.
          </p>
        </div>
      )}
      <div>
        <span ref={targetRef} />
        <Fab
          size="small"
          className={classes.buttonOne}
          onClick={() => setScaled(!scaled)}
        >
          {scaled ? <ExpandIcon /> : <ShrinkIcon />}
        </Fab>
        {process.env.DEMO !== "true" && (
          <Fab
            size="small"
            className={classes.buttonTwo}
            href={URL.createObjectURL(
              new Blob(
                [
                  `[connection]\n` +
                    `host=${ipAddress}\n` +
                    `port=${process.env.VNC_PORT}\n` +
                    `password=${process.env.VNC_PASSWORD_ENC}`
                ],
                { type: "text/plain" }
              )
            )}
            download="test.vnc"
            target="_blank"
          >
            <SaveIcon />
          </Fab>
        )}
      </div>
    </div>
  );
};

export default VncViewer;
