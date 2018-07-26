import { Actions, IAction } from "../actions/actionTypes";
import { DialogState } from "../types";

const initialState = { logLevel: false };

export default (state: DialogState = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.DIALOG_VISIBILITY:
      return { ...state, logLevel: action.logLevel };
    default:
      return { ...state };
  }
};
