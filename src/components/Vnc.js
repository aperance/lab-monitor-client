import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
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
    this.rfb.disconnect();
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
        {this.state.status === "pending" && <CircularProgress />}
        {this.state.status === "error" && <p>Connection Failed</p>}
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
