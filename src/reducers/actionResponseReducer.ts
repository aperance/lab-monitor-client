import { Actions, ActionTypeKeys } from "../actions/actionTypes";

interface State {
  err: Error | null;
  results: any[] | null;
}

const initialState = { err: null, results: null };

const actionResponseReducer = (
  state: State = initialState,
  action: Actions
) => {
  switch (action.type) {
    case ActionTypeKeys.ACTION_RESPONSE_SET:
      return { err: action.err, results: action.results };
    case ActionTypeKeys.ACTION_RESPONSE_CLEAR:
      return { err: null, results: null };
    default:
      return { ...state };
  }
};

export { actionResponseReducer, State as ActionResponseState };
