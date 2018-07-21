import { Actions } from "../actions/actionTypes";
// @ts-ignore
import initialState from "../config.json";

// @ts-ignore
export default (state = initialState, action) => {
  switch (action.type) {
    case Actions.RESET_ALL:
      return { ...initialState };
    default:
      return { ...state };
  }
};
