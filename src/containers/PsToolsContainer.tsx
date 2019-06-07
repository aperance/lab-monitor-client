import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import { psToolsResponseClear } from "../actions/actionCreators";
import PsTools from "../components/PsTools";

const mapStateToProps = ({ userSelection, deviceResponse }: StoreState) => {
  return {
    target: userSelection.rows.length === 1 ? userSelection.rows[0] : null,
    result: deviceResponse.psTools
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearResult: () => dispatch(psToolsResponseClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PsTools);
