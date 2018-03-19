import { DIALOG_VISIBILITY } from "../actions/actionTypes";

const initialState = { logLevel: false };

export default (state = initialState, action) => {
  switch (action.type) {
    case DIALOG_VISIBILITY:
      return { ...state, ...action.object };
    default:
      return { ...state };
  }
};
