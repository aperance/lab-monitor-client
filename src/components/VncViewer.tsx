import React from "react";
import { Fab, makeStyles, CircularProgress } from "@material-ui/core";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";

import { useSelector } from "../redux/store";
import { useVnc } from "../hooks/useVnc";

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
  spinner: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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

/**
 * Component implementing a VNC client connected to the selected device.
 * Connection handled by useVNC hook.
 */
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
      {
        /** Display a circular progress indicator when not connected */
        status === "disconnected" && (
          <span className={classes.spinner}>
            <CircularProgress size={60} />
          </span>
        )
      }
      {
        /** Display error message if connection fails */
        status === "error" && (
          <div className={classes.errorDiv}>
            <p>
              Unable to establish VNC connection. Make sure VNC server is
              running on the target device.
            </p>
          </div>
        )
      }
      <div>
        {/* Ref where VNC client will be injected into DOM */}
        <span ref={targetRef} />
        {/* Button to fit viewer to screen */}
        <Fab
          size="small"
          className={classes.buttonOne}
          onClick={() => setScaled(!scaled)}
        >
          {scaled ? <ExpandIcon /> : <ShrinkIcon />}
        </Fab>
        {
          /** Download link for .vnc file to be used by dedicated VNC client */
          process.env.DEMO !== "true" && (
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
          )
        }
      </div>
    </div>
  );
};

export default VncViewer;
