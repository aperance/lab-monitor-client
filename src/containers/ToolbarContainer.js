import { connect } from "react-redux";
import Toolbar from "../components/Toolbar";
import socket from "../socket.js";

const mapStateToProps = state => {
  return { selected: state.selected };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (e, selectedView) => {
      dispatch({
        type: "VIEW_SELECT",
        view: selectedView
      });
    },
    requestAction: (targets, type) => {
      console.log(targets);
      console.log(type);

      socket.emit("REQUEST_ACTION", targets, type, response =>
        console.log(response)
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
