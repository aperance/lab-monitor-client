import {
  DEVICE_DATA_ALL,
  DEVICE_DATA_UPDATE,
  RESET_ALL
} from "../actions/actionTypes";

interface IState {
  [x: string]: any;
}

interface IAction {
  type: string;
  state: IState;
  id: string;
}

const initialState: IState = {};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case DEVICE_DATA_ALL:
      return { ...action.state };
    case DEVICE_DATA_UPDATE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.state
        }
      };
    case RESET_ALL:
      return {};
    default:
      return { ...state };
  }
};