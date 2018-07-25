import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import RFB from "../../node_modules/@novnc/novnc/core/rfb.js";

class Vnc extends Component {
  constructor(props) {
    super(props);
    this.rfb = null;
    this.state = { status: "pending" };
  }

  componentDidMount() {
    this.connectVnc();
  }

  componentWillUnmount() {
    if (this.rfb) this.rfb.disconnect();
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) this.connectVnc();
  }

  connectVnc() {
    this.setState({ status: "pending" });
    if (this.rfb) this.rfb.disconnect();
    if (this.props.url) {
      this.rfb = new RFB(document.getElementById("vnc"), this.props.url, {
        credentials: { password: this.props.password }
      });
      this.rfb.scaleViewport = true;
      this.rfb.resizeSession = true;
      this.rfb.addEventListener("connect", e => {
        this.setState({ status: "connected" });
      });
      this.rfb.addEventListener("disconnect", e => {
        if (!e.detail.clean) {
          this.setState({ status: "error" });
          this.rfb = null;
        }
      });
    }
  }

  render() {
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
