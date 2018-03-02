import { connect } from "react-redux";
import HistoryList from "../components/HistoryList";

const mapStateToProps = state => {
  return {
    propertyList:
      state.selected.rows.length === 1
        ? state.table[state.selected.rows[0]]
        : {},
    selectedProperty: state.selected.history.property
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
