import { connect } from "react-redux";
import { actionResponseClear } from "../actions/actionCreators";
import { StoreState } from "../types";
import ActionResponse from "../components/ActionResponse";

const mapStateToProps = (state: StoreState) => {
  const { err, results } = state.actionResponse;
  if (err !== null) return { message: "ERROR: " + err.message };
  else if (results !== null) {
    return results.every(result => result.success === true)
      ? { message: "Request successfuly received by device(s)." }
      : {
          message:
            "Request sent but not acknowledged by every device. Please manually confirm."
        };
  } else return { message: null };
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
