import { connect } from "react-redux";
import HistoryDetails from "../components/HistoryDetails";

const mapStateToProps = state => {
  return {
    id: state.selected.rows[0],
    history: state.selected.history
  };
};

export default connect(mapStateToProps)(HistoryDetails);
