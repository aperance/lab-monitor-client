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
import { Actions } from "./actionCreators";

export interface StoreState {
  tableData: TableDataState;
  historyData: HistoryDataState;
  deviceResponse: DeviceResponseState;
  userSelection: UserSelectionState;
}

export const store = createStore(
  combineReducers<StoreState>({
    tableData: tableDataReducer,
    historyData: historyDataReducer,
    deviceResponse: deviceResponseReducer,
    userSelection: userSelectionReducer
  }),
  compose(applyMiddleware(thunk, logger))
);

export const useSelector: TypedUseSelectorHook<StoreState> = useReduxSelector;
export const useDispatch = (): Dispatch<Actions> =>
  useReduxDispatch<Dispatch<Actions>>();
