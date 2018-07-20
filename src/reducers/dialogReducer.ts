import { DIALOG_VISIBILITY } from "../actions/actionTypes";

interface IState {
  logLevel: boolean;
}

interface IAction {
  type: string;
  object: any;
}

const initialState: IState = { logLevel: false };

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case DIALOG_VISIBILITY:
      return { ...state, ...action.object };
    default:
      return { ...state };
  }
};
