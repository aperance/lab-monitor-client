import {
  PSTOOLS_RESPONSE,
  SINGLE_ROW_SELECT,
  MULTI_ROW_SELECT,
  VIEW_SELECT
} from "../actions/actionTypes";

const initialState = { result: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case PSTOOLS_RESPONSE:
      return { ...state, result: action.result };
    case SINGLE_ROW_SELECT || MULTI_ROW_SELECT || VIEW_SELECT:
      return { ...initialState };
    default:
      return { ...state };
  }
};
