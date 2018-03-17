import { connect } from "react-redux";
import { viewSelect, dialogVisibility } from "../actions";
import Toolbar from "../components/Toolbar";

const mapStateToProps = state => {
  return {
    rows: state.selected.rows,
    view: state.selected.view
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleViewClick: selectedView => dispatch(viewSelect(selectedView)),
    openLogLevel: () => dispatch(dialogVisibility({ logLevel: true }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
