import { connect } from "react-redux";
import { singleRowSelect, multiRowSelect } from "../actions/actionCreators";
import AssetTable from "../components/AssetTable";

const mapStateToProps = state => {
  return {
    columns: state.configuration.columns,
    selected: state.userSelection.rows,
    tableData: Object.entries(state.tableData).filter(([rowId, rowData]) => {
      return Object.entries(state.filter).reduce((acc, [property, allowed]) => {
        return (
          acc && (allowed.length === 0 || allowed.includes(rowData[property]))
        );
      }, true);
    })
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
