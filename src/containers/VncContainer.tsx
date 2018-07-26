import { connect } from "react-redux";
import { StoreState } from "../types";
import Vnc from "../components/Vnc";

const mapStateToProps = (state: StoreState) => {
  if (state.userSelection.rows.length === 1)
    return {
      url:
        state.configuration.vnc.proxyUrl +
        "?ip=" +
        state.userSelection.rows[0] +
        "&port=" +
        state.configuration.vnc.port,
      password: state.configuration.vnc.password
    };
  else return { url: null, password: null };
};

export default connect(mapStateToProps)(Vnc);
