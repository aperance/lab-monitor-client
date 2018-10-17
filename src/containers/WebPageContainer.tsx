import { connect } from "react-redux";
import { StoreState } from "../types";
import WebPage from "../components/WebPage";

const mapStateToProps = (state: StoreState) => {
  let url = "http://";
  if (state.userSelection.proxy)
    url +=
      state.configuration.httpProxy +
      state.configuration.statePath +
      "&target=" +
      state.userSelection.rows[0];
  else
    url +=
      state.userSelection.rows[0] + ":8001" + state.configuration.statePath;
  return { url };
};

export default connect(mapStateToProps)(WebPage);
