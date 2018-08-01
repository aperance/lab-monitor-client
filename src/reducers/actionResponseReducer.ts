import { Actions, ActionTypeKeys, ActionResponseState } from "../types";

const initialState: ActionResponseState = [];

export default (state: ActionResponseState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.ACTION_RESPONSE_SET:
      return [action.result];
    case ActionTypeKeys.ACTION_RESPONSE_CLEAR:
      return [];
    default:
      return [...state];
  }
};
