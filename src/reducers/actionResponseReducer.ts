import { Actions, ActionTypeKeys } from "../actions/actionTypes";

interface ActionResponseState {
  err: Error | null;
  results: any[] | null;
}

const initialState: ActionResponseState = { err: null, results: null };

const actionResponseReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.ACTION_RESPONSE_SET:
      return { err: action.err, results: action.results };
    case ActionTypeKeys.ACTION_RESPONSE_CLEAR:
      return { err: null, results: null };
    default:
      return { ...state };
  }
};

export { actionResponseReducer, ActionResponseState };
