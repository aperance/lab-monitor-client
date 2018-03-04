import { connect } from "react-redux";
import { historySelect } from "../actions";
import HistoryList from "../components/HistoryList";

const mapStateToProps = state => {
  return {
    properties:
      state.selected.rows.length === 1
        ? Object.keys(state.history[state.selected.rows[0]])
        : [],
    selectedProperty: state.selected.history
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: property => {
      dispatch(historySelect(property));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryList);
