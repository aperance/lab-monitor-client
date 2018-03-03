import { connect } from "react-redux";
import Toolbar from "../components/Toolbar";
import socket from "../socket.js";

const mapStateToProps = state => {
  return {
    rows: state.selected.rows,
    view: state.selected.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (e, selectedView) => {
      dispatch({
        type: "VIEW_SELECT",
        view: selectedView
      });
    },
    openLogLevel: e => {
      dispatch({
        type: "OPEN_DIALOG",
        object: { logLevel: true }
      });
    },
    requestAction: (targets, type) => {
      console.log(targets);
      console.log(type);

      socket.emit("REQUEST_ACTION", targets, type, {}, response =>
        console.log(response)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
