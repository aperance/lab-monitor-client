import { connect } from "react-redux";
import { viewSelect, dialogVisibility } from "../actions";
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
    handleViewClick: selectedView => dispatch(viewSelect(selectedView)),
    openLogLevel: () => dispatch(dialogVisibility({ logLevel: true })),
    handleActionClick: (targets, type) => {
      console.log(targets);
      console.log(type);
      socket.emit("REQUEST_ACTION", targets, type, {}, response =>
        console.log(response)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
