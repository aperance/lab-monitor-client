import * as React from "react";
import { useState } from "react";
// @ts-ignore
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";
import { useVnc } from "../hooks/useVnc";
import { Spinner } from "./Spinner";

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
  url: string;
  password: string;
  fileContents: string;
  isDragging: boolean;
}

const VncViewer = (props: Props) => {
  const classes = useStyles();
  const [scaled, setScaled] = useState(true);
  const [ref, status] = useVnc(
    props.url,
    props.password,
    scaled,
    props.isDragging
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
        <span ref={ref} />
        <Button
          variant="fab"
          mini={true}
          className={classes.buttonOne}
          onClick={() => setScaled(!scaled)}
        >
          {scaled ? <ExpandIcon /> : <ShrinkIcon />}
        </Button>
        <Button
          variant="fab"
          mini={true}
          className={classes.buttonTwo}
          href={
            props.fileContents &&
            URL.createObjectURL(
              new Blob([props.fileContents], { type: "text/plain" })
            )
          }
          download="test.vnc"
          target="_blank"
        >
          <SaveIcon />
        </Button>
      </div>
    </div>
  );
};

export { VncViewer };
