import { Actions, ActionTypeKeys, PsToolsState } from "../types";

const initialState = { result: null, err: null };

export default (state: PsToolsState = initialState, action: Actions) => {
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
