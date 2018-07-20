import {
  ACTION_RESPONSE_SET,
  ACTION_RESPONSE_CLEAR
} from "../actions/actionTypes";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_RESPONSE_SET:
      return [...action.result];
    case ACTION_RESPONSE_CLEAR:
      return [];
    default:
      return [...state];
  }
};
