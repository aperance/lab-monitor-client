import { connect } from "react-redux";
import { dialogVisibility } from "../actions";
import LogLevel from "../components/LogLevel";
import socket from "../socket.js";

const mapStateToProps = state => {
  return {
    levels: state.configuration.logLevel.level || [],
    namespaces: state.configuration.logLevel.namespace || [],
    open: state.dialog.logLevel,
    targets: state.selected.rows
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelLogLevel: () => dispatch(dialogVisibility({ logLevel: false })),
    sendLogLevel: (targets, type, parameters) => {
      socket.emit("REQUEST_ACTION", targets, type, parameters, response =>
        console.log(response)
      );
      dispatch(dialogVisibility({ logLevel: false }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogLevel);
