import {combineReducers} from "redux";
import {tableDataReducer} from "./tableDataReducer";
import {historyDataReducer} from "./historyDataReducer";
import {deviceResponseReducer} from "./deviceResponseReducer";
import {userSelectionReducer} from "./userSelectionReducer";
import {
  DeviceResponseState,
  TableDataState,
  HistoryDataState,
  UserSelectionState
} from "../store/storeTypes";

export interface StoreState {
  tableData: TableDataState;
  historyData: HistoryDataState;
  deviceResponse: DeviceResponseState;
  userSelection: UserSelectionState;
}

export default combineReducers<StoreState>({
  tableData: tableDataReducer,
  historyData: historyDataReducer,
  deviceResponse: deviceResponseReducer,
  userSelection: userSelectionReducer
});
