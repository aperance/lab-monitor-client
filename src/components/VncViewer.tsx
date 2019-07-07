import * as React from "react";
import { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { Fab } from "@material-ui/core";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";
import { ConfigurationContext } from "../configuration/ConfigurationContext";
import { useVnc } from "../hooks/useVnc";
import Spinner from "./Spinner";

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

interface Props {
  ipAddress: string;
  suspend: boolean;
}

const VncViewer = (props: Props) => {
  const classes = useStyles();
  const { port, passwordEncrypted } = useContext(ConfigurationContext).vnc;
  const { targetRef, status, scaled, setScaled } = useVnc(
    props.ipAddress,
    props.suspend
  );

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
                  `host=${props.ipAddress}\n` +
                  `port=${port}\n` +
                  `password=${passwordEncrypted}`
              ],
              { type: "text/plain" }
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
