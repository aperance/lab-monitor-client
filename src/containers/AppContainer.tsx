import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { actionResponseClear, draggingSet } from "../actions/actionCreators";
import App from "../components/App";

const mapStateToProps = ({
  userSelection,
  configuration,
  tableData,
  actionResponse
}: StoreState) => {
  return {
    title: configuration.received ? configuration.title : "",
    dataReceived: configuration.received && Object.keys(tableData).length !== 0,
    subView: userSelection.view,
    drawersVisible: (userSelection.rows.length === 0
      ? 0
      : !userSelection.view
      ? 1
      : 2) as 0 | 1 | 2,
    actionResponse
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
