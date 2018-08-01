import { Actions, ActionTypeKeys, HistoryDataState } from "../types";

const initialState = {};

export default (state: HistoryDataState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.DEVICE_DATA_ALL:
      return { ...action.history };

    case ActionTypeKeys.DEVICE_DATA_UPDATE:
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

    case ActionTypeKeys.RESET_ALL:
      return {};

    default:
      return { ...state };
  }
};
