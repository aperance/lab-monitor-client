import { connect } from "react-redux";
import { StoreState } from "../types";
import { filterSelect, proxyToggle } from "../actions/actionCreators";
import FilterBar from "../components/FilterBar";

const mapStateToProps = (state: StoreState) => {
  return {
    filters: state.configuration.filters,
    selectedFilters: state.userSelection.filters,
    proxyEnabled: state.userSelection.proxy
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleCheckboxClick: (property: string, regex: string) => {
      dispatch(filterSelect(property, regex));
    },
    handleProxyClick: () => dispatch(proxyToggle())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
