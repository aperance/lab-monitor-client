import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import PsTools from "../components/PsTools";

const mapStateToProps = ({
  userSelection,
  configuration,
  psTools
}: StoreState) => {
  return {
    target: userSelection.rows.length === 1 ? userSelection.rows[0] : null,
    presets: configuration.received ? configuration.psTools : {},
    result: psTools.result || undefined
  };
};

export default connect(mapStateToProps)(PsTools);
