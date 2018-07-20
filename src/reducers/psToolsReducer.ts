import {
  PSTOOLS_RESPONSE,
  SINGLE_ROW_SELECT,
  MULTI_ROW_SELECT,
  VIEW_SELECT
} from "../actions/actionTypes";

interface IResult {
  err: Error | null;
  result: string | null;
}

interface IState {
  result: IResult | null;
}

interface IAction {
  type: string;
  result: IResult;
}

const initialState: IState = { result: null };

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case PSTOOLS_RESPONSE:
      return { ...state, result: action.result };
    case SINGLE_ROW_SELECT || MULTI_ROW_SELECT || VIEW_SELECT:
      return { ...initialState };
    default:
      return { ...state };
  }
};
