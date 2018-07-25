import { connect } from "react-redux";
import WebPage from "../components/WebPage";

const mapStateToProps = (state: any) => {
  switch (state.userSelection.view) {
    case "statePage":
      return {
        url:
          "http://" +
          state.userSelection.rows[0] +
          state.configuration.statePath
      };
    case "logsPage":
      return {
        url:
          "http://" + state.userSelection.rows[0] + state.configuration.logsPath
      };
    default:
      return {
        url: null
      };
  }
};

export default connect(mapStateToProps)(WebPage);
