import { connect } from "react-redux";
import { StoreState } from "../types";
import NavBar from "../components/NavBar";

const mapStateToProps = (state: StoreState) => {
  return {
    title: state.configuration.title
  };
};

export default connect(mapStateToProps)(NavBar);
