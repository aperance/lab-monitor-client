import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
// @ts-ignore
import RFB from "../../node_modules/@novnc/novnc/core/rfb";

interface Props {
  url: string | null;
  password: string | null;
}

interface State {
  status: string;
}

class Vnc extends React.Component<Props, State> {
  public rfb: any = null;
  public state: State = {
    status: "pending"
  };

  public componentDidMount() {
    this.connectVnc();
  }

  public componentWillUnmount() {
    if (this.rfb) this.rfb.disconnect();
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.url !== prevProps.url) this.connectVnc();
  }

  public connectVnc() {
    this.setState({ status: "pending" });
    if (this.rfb) this.rfb.disconnect();
    if (this.props.url) {
      this.rfb = new RFB(document.getElementById("vnc"), this.props.url, {
        credentials: { password: this.props.password }
      });
      this.rfb.scaleViewport = true;
      this.rfb.resizeSession = true;
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
