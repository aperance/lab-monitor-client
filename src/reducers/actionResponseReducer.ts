import { Actions, IAction } from "../actions/actionTypes";
import { ActionResponseState } from "../types";

const initialState: ActionResponseState = [];

export default (state: ActionResponseState = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.ACTION_RESPONSE_SET:
      return [action.result];
    case Actions.ACTION_RESPONSE_CLEAR:
      return [];
    default:
      return [...state];
  }
};
