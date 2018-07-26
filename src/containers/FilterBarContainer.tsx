import { connect } from "react-redux";
import { StoreState } from "../types";
import { filterSelect } from "../actions/actionCreators";
import FilterBar from "../components/FilterBar";

const mapStateToProps = (state: StoreState) => {
  return {
    filters: state.configuration.filters,
    selectedFilters: state.userSelection.filters
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleCheckboxClick: (property: string, regex: string) => {
      dispatch(filterSelect(property, regex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
