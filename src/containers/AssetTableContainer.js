import { connect } from "react-redux";
import { singleRowSelect, multiRowSelect } from "../actions/actionCreators";
import AssetTable from "../components/AssetTable";

const mapStateToProps = state => {
  return {
    columns: state.configuration.columns,
    selectedFilters: state.userSelection.filters,
    selected: state.userSelection.rows,
    tableData: state.tableData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRowClick: (e, id) => {
      if (e.altKey || e.ctrlKey) dispatch(multiRowSelect(id));
      else dispatch(singleRowSelect(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetTable);
