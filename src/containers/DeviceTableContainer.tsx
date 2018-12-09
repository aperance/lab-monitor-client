import { connect } from "react-redux";
import { StoreState } from "../reducers/index";
import {
  singleRowSelect,
  multiRowSelect,
  proxyToggle
} from "../actions/actionCreators";
import DeviceTable from "../components/DeviceTable";

const mapStateToProps = ({ userSelection, tableData }: StoreState) => {
  return {
    selected: userSelection.rows,
    tableData: Object.entries(tableData),
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
)(DeviceTable);
