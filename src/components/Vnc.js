import React, { Component } from "react";
import RFB from "../../node_modules/@novnc/novnc/core/rfb.js";

class Vnc extends Component {
  constructor(props) {
    super(props);
    this.rfb = null;
  }

  componentDidMount() {
    this.connectVnc();
  }

  componentDidUpdate() {
    this.rfb.disconnect();
    this.connectVnc();
  }

  componentWillUnmount() {
    this.rfb.disconnect();
    console.log("vnc disconnected");
  }

  connectVnc() {
    console.log(this.props.url);
    if (this.props.url) {
      this.rfb = new RFB(document.getElementById("vnc"), this.props.url, {
        credentials: { password: this.props.password }
      });
      this.rfb.scaleViewport = true;
      this.rfb.resizeSession = true;
    }
  }

  render() {
    return <div id="vnc" style={{ height: "100%" }} />;
  }
}

export default Vnc;
