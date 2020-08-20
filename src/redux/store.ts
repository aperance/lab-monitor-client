import {
  combineReducers,
  applyMiddleware,
  createStore,
  compose,
  Dispatch
} from "redux";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  TypedUseSelectorHook
} from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {tableDataReducer} from "./tableDataReducer";
import {historyDataReducer} from "./historyDataReducer";
import {deviceResponseReducer} from "./deviceResponseReducer";
import {userSelectionReducer} from "./userSelectionReducer";
import {Actions} from "./actionCreators";

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

export default createStore(
  combineReducers<StoreState>({
    tableData: tableDataReducer,
    historyData: historyDataReducer,
    deviceResponse: deviceResponseReducer,
    userSelection: userSelectionReducer
  }),
  compose(applyMiddleware(thunk, logger))
);

export const useSelector: TypedUseSelectorHook<StoreState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<Dispatch<Actions>>();
