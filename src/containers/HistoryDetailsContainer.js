import { connect } from "react-redux";
import HistoryDetails from "../components/HistoryDetails";

const mapStateToProps = state => {
  return {
    property: state.selected.history,
    values:
      state.selected.rows.length === 1
        ? state.history[state.selected.rows[0]][state.selected.history]
        : []
  };
};

export default connect(mapStateToProps)(HistoryDetails);
