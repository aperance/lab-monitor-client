import { Actions, ActionTypeKeys, ErrorMessageState } from "../types";

const initialState = { err: null };

export default (state: ErrorMessageState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.ERROR_MESSAGE_SET:
      return { ...state, err: action.err };
    case ActionTypeKeys.ERROR_MESSAGE_CLEAR:
      return { ...state, err: null };
    default:
      return { ...state };
  }
};
