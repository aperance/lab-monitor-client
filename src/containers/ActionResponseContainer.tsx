import { connect } from "react-redux";
import { actionResponseClear } from "../actions/actionCreators";
import ActionResponse from "../components/ActionResponse";

const mapStateToProps = state => {
  return {
    result: state.actionResponse,
    visible: state.actionResponse.length ? true : false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => dispatch(actionResponseClear())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionResponse);
