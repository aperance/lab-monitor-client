import { Actions, ActionTypeKeys } from "../actions/actionTypes";

interface PsToolsState {
  err: Error | null;
  result: string | null;
}

const initialState: PsToolsState = { result: null, err: null };

const psToolsReducer = (state = initialState, action: Actions) => {
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

export { psToolsReducer, PsToolsState };
