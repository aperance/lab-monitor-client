import { Actions, ActionTypeKeys, ActionResponseState } from "../types";

const initialState: ActionResponseState = { err: null, results: null };

export default (state: ActionResponseState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.ACTION_RESPONSE_SET:
      return { err: action.err, results: action.results };
    case ActionTypeKeys.ACTION_RESPONSE_CLEAR:
      return { err: null, results: null };
    default:
      return { ...state };
  }
};
