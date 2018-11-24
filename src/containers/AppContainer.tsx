import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { actionResponseClear } from "../actions/actionCreators";
import App from "../components/App";

const mapStateToProps = (state: StoreState) => {
  return {
    title: state.configuration.title,
    dataReceived:
      Object.keys(state.configuration).length !== 0 &&
      Object.keys(state.tableData).length !== 0,
    subView: state.userSelection.view,
    drawersVisible:
      state.userSelection.rows[0] === undefined
        ? 0
        : state.userSelection.view === null
        ? 1
        : 2,
    actionResponse: state.actionResponse
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actionResponseClose: () => dispatch(actionResponseClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
