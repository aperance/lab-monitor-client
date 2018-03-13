import { connect } from "react-redux";
import { singleRowSelect, multiRowSelect } from "../actions";
import AssetTable from "../components/AssetTable";

const mapStateToProps = state => {
  return {
    columns: state.configuration.columns,
    tableData: state.table,
    selected: state.selected.rows,
    filterOptions: state.configuration.columns.reduce((acc, column) => {
      acc[column.property] = new Set();
      Object.values(state.table).forEach(rowValues => {
        acc[column.property].add(rowValues[column.property]);
      });
      return acc;
    }, {})
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

export default connect(mapStateToProps, mapDispatchToProps)(AssetTable);
