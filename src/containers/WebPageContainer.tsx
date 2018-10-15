import { connect } from "react-redux";
import { StoreState } from "../types";
import WebPage from "../components/WebPage";

const mapStateToProps = (state: StoreState) => {
  return {
    url:
      "http://" +
      state.configuration.httpProxy +
      state.configuration.statePath +
      state.userSelection.rows[0]
  };
};

export default connect(mapStateToProps)(WebPage);
