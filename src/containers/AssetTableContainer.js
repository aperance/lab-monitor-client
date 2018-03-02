import { connect } from "react-redux";
import AssetTable from "../components/AssetTable";

const mapStateToProps = state => {
  return {
    columns: state.configuration.columns,
    tableData: state.table,
    selected: state.selected.rows
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRowClick: (e, rowKey) => {
      if (e.altKey || e.ctrlKey)
        dispatch({
          type: "MULTI_ROW_SELECT",
          row: rowKey
        });
      else
        dispatch({
          type: "SINGLE_ROW_SELECT",
          row: rowKey
        });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssetTable);
