import { Reducer } from "redux";
import { Actions, ActionTypes } from "../actions/actionTypes";
import { DeviceResponseState } from "../store/storeTypes";

const initialState = {
  command: { err: null, results: null },
  psTools: { err: null, result: null }
};

export const deviceResponseReducer: Reducer<DeviceResponseState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.COMMAND_RESPONSE:
      return {
        ...state,
        command: { err: action.payload.err, results: action.payload.results }
      };
    case ActionTypes.PSTOOLS_RESPONSE:
      return {
        ...state,
        psTools: { err: action.payload.err, result: action.payload.result }
      };
    case ActionTypes.SINGLE_ROW_SELECT ||
      ActionTypes.MULTI_ROW_SELECT ||
      ActionTypes.VIEW_SELECT:
      return { ...initialState };
    default:
      return { ...state };
  }
};
