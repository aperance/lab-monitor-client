import { connect } from "react-redux";
import { viewSelect, dialogVisibility } from "../actions/actionCreators";
import Toolbar from "../components/Toolbar";

const mapStateToProps = (state: any) => {
  return {
    rows: state.userSelection.rows,
    view: state.userSelection.view
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
