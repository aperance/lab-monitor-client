import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import PsTools from "../components/PsTools";

const mapStateToProps = (state: StoreState) => {
  return {
    target: state.userSelection.rows[0],
    presets: state.configuration.psTools,
    result: state.psTools.result || undefined
  };
};

export default connect(mapStateToProps)(PsTools);
