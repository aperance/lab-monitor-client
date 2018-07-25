import { connect } from "react-redux";
import { filterSelect } from "../actions/actionCreators";
import FilterBar from "../components/FilterBar";

const mapStateToProps = (state: any) => {
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
