import { connect } from "react-redux";
import { StoreState } from "../types";
import { historySelect } from "../actions/actionCreators";
import History from "../components/History";

const mapStateToProps = (state: StoreState) => {
  const properties =
    state.userSelection.rows.length === 1
      ? Object.keys(state.historyData[state.userSelection.rows[0]])
      : [];
  return {
    properties,
    selectedIndex: properties.indexOf(state.userSelection.history || ""),
    selectedData:
      state.userSelection.history && state.userSelection.rows.length === 1
        ? state.historyData[state.userSelection.rows[0]][
            state.userSelection.history
          ]
        : []
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleClick: (property: string) => {
      dispatch(historySelect(property));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History);
