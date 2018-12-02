import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { viewSelect } from "../actions/actionCreators";
import Toolbar from "../components/Toolbar";

const mapStateToProps = ({ userSelection, configuration }: StoreState) => {
  return {
    rows: userSelection.rows,
    view: userSelection.view,
    logLevels: configuration.received ? configuration.logLevel.level : [],
    logNamespaces: configuration.received
      ? configuration.logLevel.namespace
      : [],
    fileContents:
      userSelection.rows.length === 1 && configuration.received
        ? `net use \\\\${userSelection.rows[0]} ` +
          `/user:${configuration.vnc.username} ` +
          `${configuration.vnc.password} ` +
          `/PERSISTENT:NO\n` +
          `start \\\\${userSelection.rows[0]}`
        : null,
    logsUrl:
      userSelection.rows.length === 1 && configuration.received
        ? userSelection.proxy === true
          ? `http://${configuration.httpProxy}${configuration.logsPath}` +
            `?target=${userSelection.rows[0]}`
          : `http://${userSelection.rows[0]}:8001${configuration.logsPath}`
        : null
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleViewClick: (selectedView: string) =>
      dispatch(viewSelect(selectedView))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
