import { Actions, ActionTypeKeys } from "../actions/actionTypes";

interface DeviceResponseState {
  command: { err: Error | null; results: any[] | null };
  psTools: {
    err: Error | null;
    result: string | null;
  };
}

const initialState: DeviceResponseState = {
  command: { err: null, results: null },
  psTools: { err: null, result: null }
};

const deviceResponseReducer = (state = initialState, action: Actions) => {
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

export { deviceResponseReducer, DeviceResponseState };
