import { connect } from "react-redux";
import Vnc from "../components/Vnc";

const mapStateToProps = state => {
  if (state.selected.rows.length === 1)
    return {
      url:
        state.configuration.vnc.proxyUrl +
        "?ip=" +
        state.selected.rows[0] +
        "&port=" +
        state.configuration.vnc.port,
      password: state.configuration.vnc.password
    };
  else return { url: null, password: null };
};

export default connect(mapStateToProps)(Vnc);
