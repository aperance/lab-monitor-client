import { Actions, ActionTypeKeys } from "../actions/actionTypes";

interface State {
  err: Error | null;
  result: string | null;
}

const initialState = { result: null, err: null };

const psToolsReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.PSTOOLS_RESPONSE:
      return { ...state, result: action.result };
    case ActionTypeKeys.SINGLE_ROW_SELECT ||
      ActionTypeKeys.MULTI_ROW_SELECT ||
      ActionTypeKeys.VIEW_SELECT:
      return { ...initialState };
    default:
      return { ...state };
  }
};

export { psToolsReducer, State as PsToolsState };
