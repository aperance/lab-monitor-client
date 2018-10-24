import * as React from "react";
// @ts-ignore
import RFB from "@novnc/novnc/core/rfb";

interface InjectedProps {
  targetElement: JSX.Element;
  connected: boolean;
  scale: boolean;
  changeScale: any;
}

interface Props {
  url?: string;
  password?: string;
  fileContents?: string;
  handleError: (err: Error) => void;
  children: (injectedProps: InjectedProps) => React.ReactNode;
}

interface State {
  connected: boolean;
  scale: boolean;
}

class RfbHandler extends React.Component<Props, State> {
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
    clearTimeout(this.timer);
    if (this.rfb) {
      this.rfb.removeEventListener("connect", this.connectHandler);
      this.rfb.removeEventListener("disconnect", this.disconnectHandler);
      if (this.rfb._rfb_connection_state !== "disconnected")
        this.rfb.disconnect();
      this.rfb = null;
    }
    this.setState({ connected: false });
  }

  public connectHandler = () => this.setState({ connected: true });

  public disconnectHandler = () => {
    this.setState({ connected: false });
    this.props.handleError(Error("VNC connection failed."));
    // tslint:disable-next-line:semicolon
  };

  public render() {
    return this.props.children({
      targetElement: <span id="vnc" />,
      connected: this.state.connected,
      scale: this.state.scale,
      changeScale: () => this.setState({ scale: !this.state.scale })
    });
  }
}

export default RfbHandler;
