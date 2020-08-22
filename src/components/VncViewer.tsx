/**
 *
 * @packageDocumentation
 */

import React from "react";
import {Fab, makeStyles} from "@material-ui/core";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";

import config from "../configuration/configuration";
import {useSelector} from "../redux/store";
import {useVnc} from "../hooks/useVnc";
import Spinner from "./Spinner";

/**  CSS-in-JS styling */
const useStyles = makeStyles({
  root: {
    height: "100%",
    backgroundColor: "rgb(40, 40, 40)"
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
    height: "90%"
  },
  errorDialog: {
    color: "white",
    width: "350px"
  }
});

const VncViewer = (): JSX.Element => {
  /** Generated CSS class names */
  const classes = useStyles();
  /** IP Address of the target device. */
  const ipAddress = useSelector(state =>
    process.env.DEMO === "true"
      ? process.env.VNC_IP || ""
      : state.userSelection.rows[0] ?? ""
  );
  /** Used to determine if vnc area needs to be resized. */
  const isDragging = useSelector(state => state.userSelection.dragging);
  const {targetRef, status, scaled, setScaled} = useVnc(ipAddress, isDragging);

  return (
    <div className={classes.root}>
      {status === "disconnected" && <Spinner />}
      {status === "error" && (
        <div className={classes.errorDiv}>
          <p className={classes.errorDialog}>
            Unable to establish VNC connection. Make sure VNC server is running
            on the target device.
          </p>
        </div>
      )}
      <div
        style={{
          height: "100%",
          visibility: status === "connected" ? "visible" : "hidden"
        }}
      >
        <span ref={targetRef} />
        <Fab
          size="small"
          className={classes.buttonOne}
          onClick={() => setScaled(!scaled)}
        >
          {scaled ? <ExpandIcon /> : <ShrinkIcon />}
        </Fab>
        <Fab
          size="small"
          className={classes.buttonTwo}
          href={URL.createObjectURL(
            new Blob(
              [
                `[connection]\n` +
                  `host=${ipAddress}\n` +
                  `port=${config.vnc.port}\n` +
                  `password=${config.vnc.passwordEncrypted}`
              ],
              {type: "text/plain"}
            )
          )}
          download="test.vnc"
          target="_blank"
        >
          <SaveIcon />
        </Fab>
      </div>
    </div>
  );
};

export default VncViewer;
