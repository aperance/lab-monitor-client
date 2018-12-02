import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import WebPage from "../components/WebPage";

const mapStateToProps = ({ userSelection, configuration }: StoreState) => {
  return {
    url:
      userSelection.rows.length === 1 && configuration.received
        ? userSelection.proxy === true
          ? `http://${configuration.httpProxy}${configuration.statePath}` +
            `&target=${userSelection.rows[0]}`
          : `http://${userSelection.rows[0]}:8001${configuration.statePath}`
        : null
  };
};

export default connect(mapStateToProps)(WebPage);
