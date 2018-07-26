import { connect } from "react-redux";
import { StoreState } from "../types";
import WebPage from "../components/WebPage";

const mapStateToProps = (state: StoreState) => {
  switch (state.userSelection.view) {
    case "statePage":
      return {
        url:
          "http://" +
          state.configuration.httpProxy +
          state.configuration.statePath +
          state.userSelection.rows[0]
      };
    case "logsPage":
      return {
        url:
          "http://" +
          state.configuration.httpProxy +
          state.configuration.logsPath +
          state.userSelection.rows[0]
      };
    default:
      return {
        url: null
      };
  }
};

export default connect(mapStateToProps)(WebPage);
