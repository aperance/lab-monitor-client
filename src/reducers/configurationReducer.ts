import { Actions, ActionTypeKeys } from "../actions/actionTypes";
// @ts-ignore
// import initialState from "../config.json";

const initialState = {};

// @ts-ignore
export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.CONFIGURATION:
      return { ...action.configuration };
    default:
      return { ...state };
  }
};
