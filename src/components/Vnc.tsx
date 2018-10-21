import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import ExpandIcon from "@material-ui/icons/Fullscreen";
import ShrinkIcon from "@material-ui/icons/FullscreenExit";
import SaveIcon from "@material-ui/icons/GetApp";
// @ts-ignore
import RFB from "../../node_modules/@novnc/novnc/core/rfb";

interface Props {
  url: string | null;
  password: string | null;
}

interface State {
  status: string;
  scale: boolean;
}

class Vnc extends React.Component<Props, State> {
  public rfb: any = null;
  public state: State = {
    status: "pending",
    scale: true
  };

  public componentDidMount() {
    this.connectVnc();
  }

  public componentWillUnmount() {
    if (this.rfb) this.rfb.disconnect();
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.url !== prevProps.url) this.connectVnc();
    if (this.state.scale !== prevState.scale) this.connectVnc();
    console.log("VNC UPDATED");
  }

  public connectVnc() {
    this.setState({ status: "pending" });
    if (this.rfb) this.rfb.disconnect();
    if (this.props.url) {
      this.rfb = new RFB(document.getElementById("vnc"), this.props.url, {
        credentials: { password: this.props.password }
      });
      this.rfb.scaleViewport = this.state.scale;
      this.rfb.resizeSession = true;
      this.rfb.clipViewport = false;
      this.rfb.dragViewport = false;
      this.rfb.showDotCursor = true;
      this.rfb.addEventListener("connect", () => {
        this.setState({ status: "connected" });
      });
      this.rfb.addEventListener("disconnect", (e: any) => {
        if (!e.detail.clean) {
          this.setState({ status: "error" });
          this.rfb = null;
        }
      });
    }
  }

  public render() {
    return (
      <div style={{ height: "100%" }}>
        {this.state.status === "pending" && <LinearProgress />}
        {this.state.status === "error" && (
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
          onClick={() => this.setState({ scale: !this.state.scale })}
        >
          {this.state.scale ? <ExpandIcon /> : <ShrinkIcon />}
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
          href={URL.createObjectURL(
            new Blob(["abcdef\ndlakfl\njwehjk"], { type: "text/plain" })
          )}
          download="test.vnc"
          target="_blank"
        >
          <SaveIcon />
        </Button>
        <div
          id="vnc"
          style={{
            height: "100%",
            visibility: this.state.status === "connected" ? "visible" : "hidden"
          }}
        />
      </div>
    );
  }
}

export default Vnc;
