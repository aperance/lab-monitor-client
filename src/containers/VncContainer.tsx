import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import VncViewer from "../components/VncViewer";

const mapStateToProps = ({ userSelection }: StoreState) => {
  return {
    ipAddress: userSelection.rows.length === 1 ? userSelection.rows[0] : "",
    suspend: userSelection.dragging
  };
};

export default connect(mapStateToProps)(VncViewer);
