import { connect } from "react-redux";
import PsTools from "../components/PsTools";

const mapStateToProps = state => {
  return {
    url: "http://" + state.selected.rows[0] + state.configuration.statePath
  };
};

export default connect(mapStateToProps)(PsTools);
