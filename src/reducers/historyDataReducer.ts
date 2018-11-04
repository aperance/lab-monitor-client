import { Actions, ActionTypeKeys } from "../actions/actionTypes";

interface State {
  [id: string]: {
    [property: string]: Array<[string, string | null]>;
  };
}

const initialState = {};

const historyDataReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.DEVICE_DATA_ALL:
      return { ...action.history };

    case ActionTypeKeys.DEVICE_DATA_UPDATE:
      if (action.history === null) {
        const newHistory = { ...state };
        delete newHistory[action.id];
        return newHistory;
      } else
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

    case ActionTypeKeys.RESET_ALL:
      return {};

    default:
      return { ...state };
  }
};

export { historyDataReducer, State as HistoryDataState };
