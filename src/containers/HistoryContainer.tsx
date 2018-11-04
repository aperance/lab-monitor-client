import { connect } from "react-redux";
import { StoreState } from "../types";
import { historySelect } from "../actions/actionCreators";
import History from "../components/History";

const mapStateToProps = ({ userSelection, historyData }: StoreState) => {
  const properties =
    userSelection.rows.length === 1
      ? Object.keys(historyData[userSelection.rows[0]])
      : [];
  return {
    properties,
    selectedIndex: properties.indexOf(userSelection.history || ""),
    selectedData:
      userSelection.history && userSelection.rows.length === 1
        ? historyData[userSelection.rows[0]][userSelection.history]
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
