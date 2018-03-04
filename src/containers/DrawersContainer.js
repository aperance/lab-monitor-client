import { connect } from "react-redux";
import Drawers from "../components/Drawers";

const mapStateToProps = state => {
  const offsetCalc = [
    x => [-x[0], -x[0] - x[1], -x[0] - x[1] - x[2]],
    x => [0, -x[1], -x[1] - x[2]],
    x => [x[1], 0, -x[2]],
    x => [x[1] + x[2], x[2], 0]
  ];
  const drawerContents = [
    state.selected.rows[0] ? "toolbar" : null,
    state.selected.view ? state.selected.view : null,
    state.selected.history ? "historyDetails" : null
  ];
  return {
    drawerContents,
    offsetCalc: offsetCalc[drawerContents.filter(x => x).length]
  };
};

export default connect(mapStateToProps)(Drawers);
