import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";

interface Props {
  connectionState: string;
  changeScale: () => void;
  scale: boolean;
  target: any;
  fileContents?: string;
}

class Vnc extends React.Component<Props> {
  public render() {
    return (
      <div style={{ height: "100%" }}>
        {this.props.connectionState === "connecting" && <LinearProgress />}
        {this.props.connectionState === "disconnected" && (
          <pre style={{ paddingLeft: "16px", color: "#f44336" }}>
            Connection Failed. Please ensure that VNC server is running on the
            remote device.
          </pre>
        )}
        <Button
          variant="fab"
          mini={true}
          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            backgroundColor: "white",
            opacity: 0.5
          }}
          onClick={() => this.props.changeScale()}
        >
          {this.props.scale ? <ExpandIcon /> : <ShrinkIcon />}
        </Button>
        <Button
          variant="fab"
          mini={true}
          style={{
            position: "absolute",
            right: "12px",
            top: "64px",
            backgroundColor: "white",
            opacity: 0.5
          }}
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
        <div
          style={{
            height: "100%",
            visibility: "visible"
          }}
        >
          {this.props.target()}
        </div>
      </div>
    );
  }
}

export default Vnc;
