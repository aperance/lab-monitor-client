import { connect } from "react-redux";
import { StoreState } from "../types";
import { errorMessageClear } from "../actions/actionCreators";
import ErrorMessage from "../components/ErrorMessage";

const mapStateToProps = (state: StoreState) => {
  return {
    message: state.errorMessage.err
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleClose: () => dispatch(errorMessageClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorMessage);
