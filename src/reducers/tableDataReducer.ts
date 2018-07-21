import { Actions, IAction } from "../actions/actionTypes";

interface IState {
  [id: string]: {
    [property: string]: string | null;
  };
}

const initialState = {};

export default (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.DEVICE_DATA_ALL:
      return { ...action.state };
    case Actions.DEVICE_DATA_UPDATE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.state
        }
      };
    case Actions.RESET_ALL:
      return {} as IState;
    default:
      return { ...state };
  }
};
