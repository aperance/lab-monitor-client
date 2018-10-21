import * as React from "react";
import { connect } from "react-redux";
import { StoreState } from "../types";
import Vnc from "../components/Vnc";
// @ts-ignore
import RFB from "../../node_modules/@novnc/novnc/core/rfb";

const mapStateToProps = (state: StoreState) => {
  if (state.userSelection.rows.length === 1)
    return {
      url:
        state.configuration.vnc.proxyUrl +
        "?ip=" +
        state.userSelection.rows[0] +
        "&port=" +
        state.configuration.vnc.port,
      password: state.configuration.vnc.password as string
    };
  else return { url: null, password: null };
};

interface Props {
  url: string | null;
  password: string | null;
}

interface State {
  scale: boolean;
}

class VncContainer extends React.Component<Props, State> {
  public rfb: any = null;
  public state: State = {
    scale: true
  };

  public componentDidMount() {
    this.connectVnc();
  }

  public componentWillUnmount() {
    if (this.rfb && this.rfb._rfb_connection_state !== "disconnected")
      this.rfb.disconnect();
  }

  public componentDidUpdate() {
    this.connectVnc();
  }

  public connectVnc() {
    if (this.rfb && this.rfb._rfb_connection_state !== "disconnected")
      this.rfb.disconnect();
    setTimeout(() => {
      this.rfb = new RFB(document.getElementById("vnc"), this.props.url, {
        credentials: { password: this.props.password }
      });
      this.rfb.scaleViewport = this.state.scale;
      this.rfb.addEventListener("disconnect", (e: any) => {
        if (!e.detail.clean) this.rfb = null;
      });
    }, 100);
  }

  public render() {
    return (
      <Vnc
        connectionState={this.rfb && this.rfb._rfb_connection_state}
        scale={this.state.scale}
        changeScale={() => {
          this.setState({ scale: !this.state.scale });
        }}
        target={() => <span id="vnc" />}
      />
    );
  }
}

export default connect(mapStateToProps)(VncContainer);
