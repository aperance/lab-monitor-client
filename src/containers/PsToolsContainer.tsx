import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import PsTools from "../components/PsTools";

const mapStateToProps = ({ userSelection, deviceResponse }: StoreState) => {
  return {
    target: userSelection.rows.length === 1 ? userSelection.rows[0] : null,
    result: deviceResponse.psTools.result
  };
};

export default connect(mapStateToProps)(PsTools);
