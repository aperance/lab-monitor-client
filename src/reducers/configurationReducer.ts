import { RESET_ALL } from "../actions/actionTypes";
import initialState from "../config.json";

export default (state = initialState, action) => {
  switch (action.type) {
    case RESET_ALL:
      return { ...initialState };
    default:
      return { ...state };
  }
};
