import { connect } from "react-redux";
import { filterSelect } from "../actions/actionCreators";
import FilterBar from "../components/FilterBar";

const mapStateToProps = state => {
  return {
    filters: state.configuration.filters,
    selectedFilters: state.userSelection.filters
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCheckboxClick: (property, regex) => {
      dispatch(filterSelect(property, regex));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBar);
