import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { viewSelect } from "../actions/actionCreators";
import { Toolbar } from "../components/Toolbar";

const mapStateToProps = ({ userSelection, configuration }: StoreState) => {
  return {
    rows: userSelection.rows,
    view: userSelection.view,
    fileContents:
      `net use \\\\${userSelection.rows[0]} ` +
      `/user:${configuration.vnc.username} ` +
      `${configuration.vnc.password} ` +
      `/PERSISTENT:NO\n` +
      `start \\\\${userSelection.rows[0]}`,
    logsUrl:
      userSelection.proxy === true
        ? `http://${configuration.httpProxy}${configuration.logsPath}` +
          `?target=${userSelection.rows[0]}`
        : `http://${userSelection.rows[0]}:8001${configuration.logsPath}`,
    logLevels: configuration.logLevel.level,
    logNamespaces: configuration.logLevel.namespace
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleViewClick: (selectedView: string) =>
      dispatch(viewSelect(selectedView))
  };
};

export const ToolbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
