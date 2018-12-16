import { Reducer } from "redux";
import { Actions, ActionTypeKeys } from "../actions/actionTypes";
import { TableDataState } from "../store/storeTypes";

const initialState = {};

export const tableDataReducer: Reducer<TableDataState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypeKeys.DEVICE_DATA_ALL:
      return { ...action.state };
    case ActionTypeKeys.DEVICE_DATA_UPDATE:
      if (action.state === null) {
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      } else
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            ...action.state
          }
        };
    case ActionTypeKeys.RESET_ALL:
      return { ...initialState };
    default:
      return { ...state };
  }
};
