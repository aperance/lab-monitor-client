import { Actions, IAction } from "../actions/actionTypes";
import { PsToolsState } from "../types";

const initialState = { result: null, err: null };

export default (state: PsToolsState = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.PSTOOLS_RESPONSE:
      return { ...state, result: action.result };
    case Actions.SINGLE_ROW_SELECT ||
      Actions.MULTI_ROW_SELECT ||
      Actions.VIEW_SELECT:
      return { ...initialState };
    default:
      return { ...state };
  }
};
