import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import {
  singleRowSelect,
  multiRowSelect,
  proxyToggle
} from "../actions/actionCreators";
import AssetTable from "../components/AssetTable";

const mapStateToProps = ({
  userSelection,
  configuration,
  tableData
}: StoreState) => {
  return {
    columns: configuration.received ? configuration.columns : [],
    selected: userSelection.rows,
    tableData: Object.entries(tableData),
    filters: configuration.received ? configuration.filters : [],
    proxyEnabled: userSelection.proxy,
    pause: userSelection.dragging
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
