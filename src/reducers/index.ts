import { combineReducers } from "redux";
import { tableDataReducer, TableDataState } from "./tableDataReducer";
import { historyDataReducer, HistoryDataState } from "./historyDataReducer";
import { psToolsReducer, PsToolsState } from "./psToolsReducer";
import {
  actionResponseReducer,
  ActionResponseState
} from "./actionResponseReducer";
import {
  userSelectionReducer,
  UserSelectionState
} from "./userSelectionReducer";

export interface StoreState {
  tableData: TableDataState;
  userSelection: UserSelectionState;
  historyData: HistoryDataState;
  psTools: PsToolsState;
  actionResponse: ActionResponseState;
}

export default combineReducers<StoreState>({
  tableData: tableDataReducer,
  userSelection: userSelectionReducer,
  historyData: historyDataReducer,
  psTools: psToolsReducer,
  actionResponse: actionResponseReducer
});
