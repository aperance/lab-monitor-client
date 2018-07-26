import { connect } from "react-redux";
import { actionResponseClear } from "../actions/actionCreators";
import { StoreState } from "../types";
import ActionResponse from "../components/ActionResponse";

const mapStateToProps = (state: StoreState) => {
  return {
    result: state.actionResponse,
    visible: state.actionResponse.length ? true : false
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleClose: () => dispatch(actionResponseClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionResponse);
