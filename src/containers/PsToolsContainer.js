import { connect } from "react-redux";
import { psToolsResponse } from "../actions";
import PsTools from "../components/PsTools";
import socket from "../socket.js";

const mapStateToProps = state => {
  return {
    target: state.selected.rows[0],
    presets: state.configuration.psTools,
    response: state.psTools.response
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendCommand: (target, { mode, cmd }) => {
      socket.emit("PSTOOLS", target, mode, cmd, response =>
        dispatch(psToolsResponse(response))
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PsTools);