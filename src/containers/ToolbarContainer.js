import { connect } from "react-redux";
import { viewSelect, dialogVisibility } from "../actions/actionCreators";
import Toolbar from "../components/Toolbar";

const mapStateToProps = state => {
  return {
    rows: state.userSelection.rows,
    view: state.userSelection.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleViewClick: selectedView => dispatch(viewSelect(selectedView)),
    openLogLevel: () => dispatch(dialogVisibility({ logLevel: true }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
