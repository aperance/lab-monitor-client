import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { actionResponseClear, draggingSet } from "../actions/actionCreators";
import App from "../components/App";

const mapStateToProps = (state: StoreState) => {
  if (!state.configuration.received)
    return {
      title: "",
      dataReceived: false,
      subView: null,
      drawersVisible: 0 as 0 | 1 | 2,
      actionResponse: state.actionResponse
    };
  else
    return {
      title: state.configuration.title,
      dataReceived: Object.keys(state.tableData).length !== 0,
      subView: state.userSelection.view,
      drawersVisible: (state.userSelection.rows[0] === undefined
        ? 0
        : state.userSelection.view === null
        ? 1
        : 2) as 0 | 1 | 2,
      actionResponse: state.actionResponse
    };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actionResponseClose: () => dispatch(actionResponseClear()),
    draggingSet: (isDragging: boolean) => dispatch(draggingSet(isDragging))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
