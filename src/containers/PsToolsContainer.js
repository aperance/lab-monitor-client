import { connect } from "react-redux";
import { psToolsResponse } from "../actions/actionCreators";
import PsTools from "../components/PsTools";
import websocket from "../websocket.js";

const mapStateToProps = state => {
  return {
    target: state.userSelection.rows[0],
    presets: state.configuration.psTools,
    response: state.psTools.response
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendCommand: (target, { mode, cmd }) => {
      websocket.emit("PSTOOLS", target, mode, cmd, response =>
        dispatch(psToolsResponse(response))
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PsTools);
