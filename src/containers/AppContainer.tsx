import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { deviceCommandResponse, draggingSet } from "../actions/actionCreators";
import App from "../components/App";

const mapStateToProps = ({
  userSelection,
  tableData,
  deviceResponse
}: StoreState) => {
  return {
    dataReceived: Object.keys(tableData).length !== 0,
    subView: userSelection.view,
    drawersVisible: (userSelection.rows.length === 0
      ? 0
      : !userSelection.view
      ? 1
      : 2) as 0 | 1 | 2,
    deviceResponse: deviceResponse.command
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deviceResponseClear: () =>
      dispatch(deviceCommandResponse({ err: null, results: null })),
    draggingSet: (isDragging: boolean) => dispatch(draggingSet({ isDragging }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
