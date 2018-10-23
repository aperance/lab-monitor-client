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
      password: state.configuration.vnc.password as string,
      fileContents:
        `[connection]\n` +
        `host=${state.userSelection.rows[0]}\n` +
        `port=${state.configuration.vnc.port}\n` +
        `password=${state.configuration.vnc.passwordEncrypted}`
    };
  else return {};
};

interface Props {
  url?: string;
  password?: string;
  fileContents?: string;
}

interface State {
  connected: boolean;
  scale: boolean;
}

class VncContainer extends React.Component<Props, State> {
  public rfb: any = null;
  public timer?: any;
  public state: State = {
    connected: false,
    scale: true
  };

  public componentDidMount() {
    this.connectVnc();
  }

  public componentDidUpdate(prevProps: Props, prevSate: State) {
    if (this.props.url !== prevProps.url) this.connectVnc();
    if (this.state.scale !== prevSate.scale) this.connectVnc();
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
    this.rfb.removeEventListener("connect", this.connectHandler);
    this.rfb.removeEventListener("disconnect", this.disconnectHandler);
    this.disconnectVnc();
  }

  public connectVnc() {
    this.disconnectVnc();
    this.timer = setTimeout(() => {
      this.rfb = new RFB(document.getElementById("vnc"), this.props.url, {
        credentials: { password: this.props.password }
      });
      this.rfb.scaleViewport = this.state.scale;
      this.rfb.addEventListener("connect", this.connectHandler);
      this.rfb.addEventListener("disconnect", this.disconnectHandler);
    }, 100);
  }

  public disconnectVnc() {
    if (this.rfb) {
      if (this.rfb._rfb_connection_state !== "disconnected")
        this.rfb.disconnect();
      this.rfb = null;
    }
  }

  public connectHandler = () => this.setState({ connected: true });

  public disconnectHandler = () => this.setState({ connected: false });

  public render() {
    return (
      <Vnc
        connected={this.state.connected}
        scale={this.state.scale}
        changeScale={() => {
          this.setState({ scale: !this.state.scale });
        }}
        target={() => <span id="vnc" />}
        fileContents={this.props.fileContents}
      />
    );
  }
}

export default connect(mapStateToProps)(VncContainer);
