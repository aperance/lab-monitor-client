import { Actions, IAction } from "../actions/actionTypes";

interface IState {
  logLevel: boolean;
}

const initialState = { logLevel: false };

export default (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.DIALOG_VISIBILITY:
      return { ...state, logLevel: action.logLevel };
    default:
      return { ...state };
  }
};
