/* eslint-disable no-case-declarations */
import {Reducer} from "redux";
import {Actions, ActionTypes, DeviceResponseState} from "./reduxTypes";

const initialState = {
  command: {err: null, results: null},
  psTools: ""
};

export const deviceResponseReducer: Reducer<DeviceResponseState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.COMMAND_RESPONSE:
      return {
        ...state,
        command: {err: action.payload.err, results: action.payload.results}
      };
    case ActionTypes.PSTOOLS_RESPONSE:
      const newResult = state.psTools + action.payload.result;
      return {
        ...state,
        psTools: newResult
      };
    case ActionTypes.PSTOOLS_RESPONSE_CLEAR:
      return {
        ...state,
        psTools: ""
      };
    case ActionTypes.SINGLE_ROW_SELECT ||
      ActionTypes.MULTI_ROW_SELECT ||
      ActionTypes.VIEW_SELECT:
      return {...initialState};
    default:
      return {...state};
  }
};
