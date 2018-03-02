import { connect } from "react-redux";
import Toolbar from "../components/Toolbar";

const mapStateToProps = state => {
  return { selected: state.selected };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClick: (e, selectedView) => {
      dispatch({
        type: "VIEW_SELECT",
        view: selectedView
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
