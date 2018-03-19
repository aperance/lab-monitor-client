import { connect } from "react-redux";
import HistoryDetails from "../components/HistoryDetails";

const mapStateToProps = state => {
  return {
    property: state.userSelection.history,
    values:
      state.userSelection.rows.length === 1
        ? state.historyData[state.userSelection.rows[0]][
            state.userSelection.history
          ]
        : []
  };
};

export default connect(mapStateToProps)(HistoryDetails);
