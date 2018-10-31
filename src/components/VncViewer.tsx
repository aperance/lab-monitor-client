import * as React from "react";
// @ts-ignore
import { useState } from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";
// @ts-ignore
import { useVnc } from "../hooks/useVnc";

const styles = createStyles({
  root: { height: "100%" },
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
  }
});

interface Props extends WithStyles<typeof styles> {
  url: string;
  password: string;
  fileContents: string;
  handleError: (err: Error) => void;
}

function VncViewer(props: Props) {
  const [scaled, setScaled] = useState(true);
  const [ref, status] = useVnc(props.url, props.password, scaled);

  return (
    <>
      {status === "disconnected" && <LinearProgress />}
      {status === "error" && <pre>ERROR</pre>}
      <div
        className={props.classes.root}
        style={{
          visibility: status === "connected" ? "visible" : "hidden"
        }}
      >
        <span ref={ref} />
        <Button
          variant="fab"
          mini={true}
          className={props.classes.buttonOne}
          onClick={() => setScaled(!scaled)}
        >
          {scaled ? <ExpandIcon /> : <ShrinkIcon />}
        </Button>
        <Button
          variant="fab"
          mini={true}
          className={props.classes.buttonTwo}
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
    </>
  );
}

export default withStyles(styles)(VncViewer);
