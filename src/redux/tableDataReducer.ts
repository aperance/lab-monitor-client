import { Reducer } from "redux";
import { Actions, ActionTypes, TableDataState } from "./types";

export const tableDataReducer: Reducer = (
  state: TableDataState = {},
  action: Actions
): TableDataState => {
  switch (action.type) {
    case ActionTypes.DEVICE_DATA_ALL:
      return { ...action.payload.state };

    case ActionTypes.DEVICE_DATA_UPDATE: {
      const newState = { ...state };
      /** Merge state update is provided, clear state otherwise */
      if (action.payload.state !== null)
        newState[action.payload.id] = {
          ...state[action.payload.id],
          ...action.payload.state
        };
      else delete newState[action.payload.id];
      return newState;
    }

    case ActionTypes.RESET_ALL:
      return {};

    default:
      return { ...state };
  }
};
