import { connect } from "react-redux";
import { historySelect } from "../actions/actionCreators";
import HistoryList from "../components/HistoryList";

const mapStateToProps = state => {
  return {
    properties:
      state.userSelection.rows.length === 1
        ? Object.keys(state.historyData[state.userSelection.rows[0]])
        : [],
    selectedProperty: state.userSelection.history
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
