import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { viewSelect } from "../actions/actionCreators";
import Toolbar from "../components/Toolbar";

const mapStateToProps = ({ userSelection }: StoreState) => {
  return {
    rows: userSelection.rows,
    view: userSelection.view,
    proxyEnabled: userSelection.proxy
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleViewClick: (view: string) => dispatch(viewSelect({ view }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
