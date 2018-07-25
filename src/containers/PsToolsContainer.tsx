import { connect } from "react-redux";
import PsTools from "../components/PsTools";

const mapStateToProps = state => {
  return {
    target: state.userSelection.rows[0],
    presets: state.configuration.psTools,
    result: state.psTools.result
  };
};

export default connect(mapStateToProps)(PsTools);
