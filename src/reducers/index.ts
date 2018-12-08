import { combineReducers } from "redux";
import { tableDataReducer, TableDataState } from "./tableDataReducer";
import { historyDataReducer, HistoryDataState } from "./historyDataReducer";
import {
  deviceResponseReducer,
  DeviceResponseState
} from "./deviceResponseReducer";
import {
  userSelectionReducer,
  UserSelectionState
} from "./userSelectionReducer";

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
