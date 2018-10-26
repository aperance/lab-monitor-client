import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";
import RfbHandler from "./RfbHandler";

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
  url?: string;
  password?: string;
  fileContents?: string;
  handleError: (err: Error) => void;
}

const Vnc: React.SFC<Props> = (props: Props) => (
  <RfbHandler
    url={props.url}
    password={props.password}
    fileContents={props.fileContents}
    handleError={props.handleError}
  >
    {injectedProps => (
      <>
        {!injectedProps.connected && <LinearProgress />}
        <div
          className={props.classes.root}
          style={{
            visibility: injectedProps.connected ? "visible" : "hidden"
          }}
        >
          {injectedProps.targetElement}
          <Button
            variant="fab"
            mini={true}
            className={props.classes.buttonOne}
            onClick={injectedProps.changeScale}
          >
            {injectedProps.scale ? <ExpandIcon /> : <ShrinkIcon />}
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
    )}
  </RfbHandler>
);

export default withStyles(styles)(Vnc);
