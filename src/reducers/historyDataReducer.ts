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
  id: string;
  history: Array<[string, string]>;
}

const initialState: IState = {};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case DEVICE_DATA_ALL:
      return { ...action.history };

    case DEVICE_DATA_UPDATE:
      return {
        ...state,
        [action.id]: action.history.reduce(
          (acc, [key, newRecord]) => {
            if (!acc[key]) acc[key] = [];
            acc[key] = [newRecord, ...acc[key]];
            return acc;
          },
          { ...state[action.id] }
        )
      };

    case RESET_ALL:
      return {};

    default:
      return { ...state };
  }
};
