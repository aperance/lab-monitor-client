import { connect } from "react-redux";
import HistoryDetails from "../components/HistoryDetails";
import socket from "../socket.js";

const mapStateToProps = state => {
  return {
    id: state.selected.rows[0],
    history: state.selected.history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHistory: (id, property) => {
      socket.emit("GET_HISTORY", id, property, response => {
        console.log(response);
        dispatch({
          type: "HISTORY_POPULATE",
          id,
          property,
          values: response
        });
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDetails);
