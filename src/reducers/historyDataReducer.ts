import { Actions, IAction } from "../actions/actionTypes";

interface IState {
  [id: string]: {
    [property: string]: Array<[string, string | null]>;
  };
}

const initialState = {};

export default (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.DEVICE_DATA_ALL:
      return { ...action.history };

    case Actions.DEVICE_DATA_UPDATE:
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

    case Actions.RESET_ALL:
      return {};

    default:
      return { ...state };
  }
};
