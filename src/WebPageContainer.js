import { connect } from "react-redux";
import WebPage from "../components/WebPage";

const mapStateToProps = state => {
  switch (state.selected.view) {
    case "statePage":
      return {
        url: "http://" + state.selected.rows[0] + state.configuration.statePath
      };
    case "logsPage":
      return {
        url: "http://" + state.selected.rows[0] + state.configuration.logsPath
      };
    default:
      return {
        url: null
      };
  }
};

export default connect(mapStateToProps)(WebPage);
