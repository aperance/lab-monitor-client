import { combineReducers } from "redux";
import {
  configurationReducer,
  ConfigurationState
} from "./configurationReducer";
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
  configuration: ConfigurationState;
  tableData: TableDataState;
  userSelection: UserSelectionState;
  historyData: HistoryDataState;
  psTools: PsToolsState;
  actionResponse: ActionResponseState;
}

export default combineReducers<StoreState>({
  configuration: configurationReducer,
  tableData: tableDataReducer,
  userSelection: userSelectionReducer,
  historyData: historyDataReducer,
  psTools: psToolsReducer,
  actionResponse: actionResponseReducer
});
