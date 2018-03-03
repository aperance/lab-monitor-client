import { connect } from "react-redux";
import HistoryList from "../components/HistoryList";

const mapStateToProps = state => {
  return {
    id: state.selected.rows[0],
    properties:
      state.selected.rows.length === 1
        ? Object.keys(state.history[state.selected.rows[0]])
        : [],
    selectedProperty: state.selected.history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (e, property) => {
      dispatch({
        type: "HISTORY_SELECT",
        property
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList);
