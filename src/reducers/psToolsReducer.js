import { PSTOOLS_RESPONSE } from "../actions/actionTypes";

const initialState = { response: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case PSTOOLS_RESPONSE:
      return { ...state, response: action.response };
    default:
      return { ...state };
  }
};
