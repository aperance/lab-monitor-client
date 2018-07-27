import { Actions, IAction } from "../actions/actionTypes";
import { HistoryDataState } from "../types";

const initialState = {};

export default (state: HistoryDataState = initialState, action: IAction) => {
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
            while (acc[key].length > 10) acc[key].pop();
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
