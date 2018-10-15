import { connect } from "react-redux";
import { StoreState } from "../types";
import { viewSelect, dialogVisibility } from "../actions/actionCreators";
import Toolbar from "../components/Toolbar";

const mapStateToProps = (state: StoreState) => {
  return {
    rows: state.userSelection.rows,
    view: state.userSelection.view,
    logsUrl:
      "http://" +
      state.configuration.httpProxy +
      state.configuration.logsPath +
      state.userSelection.rows[0]
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleViewClick: (selectedView: string) =>
      dispatch(viewSelect(selectedView)),
    openLogLevel: () => dispatch(dialogVisibility({ logLevel: true }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
