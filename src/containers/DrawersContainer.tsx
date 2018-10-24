import { connect } from "react-redux";
import { StoreState } from "../types";
import Drawers from "../components/Drawers";

const mapStateToProps = (state: StoreState) => {
  return {
    drawersVisible:
      state.userSelection.rows[0] === undefined
        ? 0
        : state.userSelection.view === null
          ? 1
          : 2,
    subView: state.userSelection.view
  };
};

export default connect(mapStateToProps)(Drawers);
