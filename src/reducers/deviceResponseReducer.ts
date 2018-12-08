import { Actions, ActionTypeKeys } from "../actions/actionTypes";
import { DeviceResponseState } from "../store/storeTypes";

const initialState: DeviceResponseState = {
  command: { err: null, results: null },
  psTools: { err: null, result: null }
};

export const deviceResponseReducer = (
  state = initialState,
  action: Actions
) => {
  switch (action.type) {
    case ActionTypeKeys.COMMAND_RESPONSE:
      return {
        ...state,
        command: { err: action.err, results: action.results }
      };
    case ActionTypeKeys.PSTOOLS_RESPONSE:
      return { ...state, psTools: { err: action.err, result: action.result } };
    case ActionTypeKeys.SINGLE_ROW_SELECT ||
      ActionTypeKeys.MULTI_ROW_SELECT ||
      ActionTypeKeys.VIEW_SELECT:
      return { ...initialState };
    default:
      return { ...state };
  }
};
