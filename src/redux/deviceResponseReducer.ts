import { Reducer } from "redux";
import { Actions, ActionTypes, DeviceResponseState } from "./types";

const initialState = {
  command: { err: null, ack: null },
  psTools: ""
};

export const deviceResponseReducer: Reducer = (
  state: DeviceResponseState = initialState,
  action: Actions
): DeviceResponseState => {
  switch (action.type) {
    case ActionTypes.COMMAND_RESPONSE:
      return {
        ...state,
        command: action.payload
      };

    case ActionTypes.PSTOOLS_RESPONSE:
      return {
        ...state,
        psTools: state.psTools + action.payload.result
      };

    case ActionTypes.PSTOOLS_RESPONSE_CLEAR:
      return {
        ...state,
        psTools: ""
      };

    case ActionTypes.SINGLE_ROW_SELECT ||
      ActionTypes.MULTI_ROW_SELECT ||
      ActionTypes.VIEW_SELECT:
      return { ...initialState };

    default:
      return { ...state };
  }
};
