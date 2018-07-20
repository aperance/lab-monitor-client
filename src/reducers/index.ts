import { combineReducers } from "redux";
import configurationReducer from "./configurationReducer";
import tableDataReducer from "./tableDataReducer";
import userSelectionReducer from "./userSelectionReducer";
import historyDataReducer from "./historyDataReducer";
import dialogReducer from "./dialogReducer";
import psToolsReducer from "./psToolsReducer";
import actionResponseReducer from "./actionResponseReducer";

// @ts-ignore
export default combineReducers({
  configuration: configurationReducer,
  tableData: tableDataReducer,
  userSelection: userSelectionReducer,
  historyData: historyDataReducer,
  dialog: dialogReducer,
  psTools: psToolsReducer,
  actionResponse: actionResponseReducer
});
