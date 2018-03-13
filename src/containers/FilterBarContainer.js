import { connect } from "react-redux";
import { filterSelect } from "../actions";
import FilterBar from "../components/FilterBar";

const mapStateToProps = state => {
  return {
    filters: state.configuration.filters,
    selectedFilters: state.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCheckboxClick: (property, option) => {
      dispatch(filterSelect(property, option));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
