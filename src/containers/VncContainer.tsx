import { connect } from "react-redux";
import { StoreState } from "../types";
import VncViewer from "../components/VncViewer";

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
  else return { url: "", password: "", fileContents: "" };
};

export default connect(mapStateToProps)(VncViewer);
