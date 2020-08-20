import {combineReducers, applyMiddleware, createStore, compose} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {tableDataReducer} from "./tableDataReducer";
import {historyDataReducer} from "./historyDataReducer";
import {deviceResponseReducer} from "./deviceResponseReducer";
import {userSelectionReducer} from "./userSelectionReducer";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DeviceResponseState {
  command: {err: Error | null; results: any[] | null};
  psTools: string;
}

export interface HistoryDataState {
  [id: string]: {
    [property: string]: Array<[string, string | null]>;
  };
}

export interface TableDataState {
  [id: string]: {
    [property: string]: string | null;
  };
}

export interface UserSelectionState {
  rows: string[];
  view: string | null;
  proxy: boolean;
  dragging: boolean;
}

export interface StoreState {
  tableData: TableDataState;
  historyData: HistoryDataState;
  deviceResponse: DeviceResponseState;
  userSelection: UserSelectionState;
}

export default configureStore({
  reducer: {
    tableData: tableDataReducer,
    historyData: historyDataReducer,
    deviceResponse: deviceResponseReducer,
    userSelection: userSelectionReducer
  }
});
