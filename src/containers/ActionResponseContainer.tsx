import { connect } from "react-redux";
import { actionResponseClear } from "../actions/actionCreators";
import ActionResponse from "../components/ActionResponse";

const mapStateToProps = (state: any) => {
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
