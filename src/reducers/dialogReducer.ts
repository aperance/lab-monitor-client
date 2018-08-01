import { Actions, ActionTypeKeys, DialogState } from "../types";

const initialState = { logLevel: false };

export default (state: DialogState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.DIALOG_VISIBILITY:
      return { ...state, logLevel: action.logLevel };
    default:
      return { ...state };
  }
};
