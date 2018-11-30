import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import {
  singleRowSelect,
  multiRowSelect,
  proxyToggle
} from "../actions/actionCreators";
import AssetTable from "../components/AssetTable";

const mapStateToProps = (state: StoreState) => {
  return {
    columns: state.configuration.columns,
    selected: state.userSelection.rows,
    tableData: Object.entries(state.tableData),
    filters: state.configuration.filters,
    proxyEnabled: state.userSelection.proxy,
    pause: state.userSelection.dragging
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    handleRowClick: (e: MouseEvent, id: string | null) => {
      if (e.altKey || e.ctrlKey) dispatch(multiRowSelect(id));
      else dispatch(singleRowSelect(id));
    },
    handleProxyClick: () => dispatch(proxyToggle())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssetTable);
