import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import WebPage from "../components/WebPage";

const mapStateToProps = ({ userSelection }: StoreState) => {
  return {
    ipAddress: userSelection.rows.length === 1 ? userSelection.rows[0] : null,
    proxyEnabled: userSelection.proxy
  };
};

export default connect(mapStateToProps)(WebPage);
