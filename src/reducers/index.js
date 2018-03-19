import { combineReducers } from "redux";
import configurationReducer from "./configurationReducer";
import tableDataReducer from "./tableDataReducer";
import userSelectionReducer from "./userSelectionReducer";
import historyDataReducer from "./historyDataReducer";
import dialogReducer from "./dialogReducer";
import filterReducer from "./filterReducer";
import psToolsReducer from "./psToolsReducer";

export default combineReducers({
  configuration: configurationReducer,
  tableData: tableDataReducer,
  userSelection: userSelectionReducer,
  historyData: historyDataReducer,
  dialog: dialogReducer,
  filter: filterReducer,
  psTools: psToolsReducer
});
