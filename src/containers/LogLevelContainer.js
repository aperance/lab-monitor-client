import { connect } from "react-redux";
import LogLevel from "../components/LogLevel";

const mapStateToProps = state => {
  return {
    url: "http://" + state.selected.rows[0] + state.configuration.statePath
  };
};

export default connect(mapStateToProps)(LogLevel);
