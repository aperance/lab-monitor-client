import { connect } from "react-redux";
import { historySelect } from "../actions/actionCreators";
import History from "../components/History";

const mapStateToProps = state => {
  const properties =
    state.userSelection.rows.length === 1
      ? Object.keys(state.historyData[state.userSelection.rows[0]])
      : [];
  return {
    properties,
    selectedProperty: state.userSelection.history,
    selectedIndex: properties.indexOf(state.userSelection.history),
    selectedData:
      state.userSelection.rows.length === 1
        ? state.historyData[state.userSelection.rows[0]][
            state.userSelection.history
          ]
        : []
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: property => {
      dispatch(historySelect(property));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
