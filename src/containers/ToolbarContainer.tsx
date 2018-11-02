import { connect } from "react-redux";
import { StoreState } from "../types";
import { viewSelect } from "../actions/actionCreators";
import Toolbar from "../components/Toolbar";

const mapStateToProps = (state: StoreState) => {
  let logsUrl = "http://";
  if (state.userSelection.proxy)
    logsUrl +=
      state.configuration.httpProxy +
      state.configuration.logsPath +
      "?target=" +
      state.userSelection.rows[0];
  else
    logsUrl +=
      state.userSelection.rows[0] + ":8001" + state.configuration.logsPath;
  return {
    rows: state.userSelection.rows,
    view: state.userSelection.view,
    logsUrl,
    fileContents:
      `net use \\\\${state.userSelection.rows[0]} ` +
      `/user:${state.configuration.vnc.username} ` +
      `${state.configuration.vnc.password} ` +
      `/PERSISTENT:NO\n` +
      `start \\\\${state.userSelection.rows[0]}`,
    logLevels: state.configuration.logLevel.level,
    logNamespaces: state.configuration.logLevel.namespace
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
