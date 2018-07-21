import { Actions, IAction } from "../actions/actionTypes";

interface IState {
  err: Error | null;
  result: string | null;
}

const initialState = { result: null, err: null };

export default (state: IState = initialState, action: IAction) => {
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
