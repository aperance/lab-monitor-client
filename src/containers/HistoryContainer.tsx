import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import History from "../components/History";

const mapStateToProps = ({ userSelection, historyData }: StoreState) => {
  return {
    historyData:
      userSelection.rows.length === 1 ? historyData[userSelection.rows[0]] : {},
    properties:
      userSelection.rows.length === 1
        ? Object.keys(historyData[userSelection.rows[0]])
        : []
  };
};

export default connect(mapStateToProps)(History);
