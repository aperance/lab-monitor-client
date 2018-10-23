import * as React from "react";
import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";

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
  connected: boolean;
  changeScale: () => void;
  scale: boolean;
  target: any;
  fileContents?: string;
}

class Vnc extends React.Component<Props> {
  public render() {
    return (
      <>
        {!this.props.connected && <LinearProgress />}
        <div
          className={this.props.classes.root}
          style={{ visibility: this.props.connected ? "visible" : "hidden" }}
        >
          {this.props.target()}
          <Button
            variant="fab"
            mini={true}
            className={this.props.classes.buttonOne}
            onClick={() => this.props.changeScale()}
          >
            {this.props.scale ? <ExpandIcon /> : <ShrinkIcon />}
          </Button>
          <Button
            variant="fab"
            mini={true}
            className={this.props.classes.buttonTwo}
            href={
              this.props.fileContents &&
              URL.createObjectURL(
                new Blob([this.props.fileContents], { type: "text/plain" })
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
}

export default withStyles(styles)(Vnc);
