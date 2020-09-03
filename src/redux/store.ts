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

import { tableDataReducer } from "./tableDataReducer";
import { historyDataReducer } from "./historyDataReducer";
import { deviceResponseReducer } from "./deviceResponseReducer";
import { userSelectionReducer } from "./userSelectionReducer";
import { Actions, StoreState } from "./types";

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
export const useDispatch = (): Dispatch<Actions> =>
  useReduxDispatch<Dispatch<Actions>>();
