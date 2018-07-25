import { connect } from "react-redux";
import { dialogVisibility } from "../actions/actionCreators";
import LogLevel from "../components/LogLevel";

const mapStateToProps = (state: any) => {
  return {
    levels: state.configuration.logLevel
      ? state.configuration.logLevel.level
      : [],
    namespaces: state.configuration.logLevel
      ? state.configuration.logLevel.namespace
      : [],
    open: state.dialog.logLevel,
    targets: state.userSelection.rows
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    cancelLogLevel: () => dispatch(dialogVisibility({ logLevel: false }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogLevel);