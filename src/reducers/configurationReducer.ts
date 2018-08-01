import { ActionTypeKeys } from "../types";
// @ts-ignore
import initialState from "../config.json";

// @ts-ignore
export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypeKeys.RESET_ALL:
      return { ...initialState };
    default:
      return { ...state };
  }
};
