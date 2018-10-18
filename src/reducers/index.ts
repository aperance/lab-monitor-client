import { combineReducers } from "redux";
import { StoreState } from "../types";
import configurationReducer from "./configurationReducer";
import tableDataReducer from "./tableDataReducer";
import userSelectionReducer from "./userSelectionReducer";
import historyDataReducer from "./historyDataReducer";
import dialogReducer from "./dialogReducer";
import errorMessageReducer from "./errorMessageReducer";
import psToolsReducer from "./psToolsReducer";
import actionResponseReducer from "./actionResponseReducer";

export default combineReducers<StoreState>({
  configuration: configurationReducer,
  tableData: tableDataReducer,
  userSelection: userSelectionReducer,
  historyData: historyDataReducer,
  dialog: dialogReducer,
  errorMessage: errorMessageReducer,
  psTools: psToolsReducer,
  actionResponse: actionResponseReducer
});
