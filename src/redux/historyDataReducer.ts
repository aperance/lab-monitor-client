import { Actions, ActionTypes } from "./actionCreators";

export interface HistoryDataState {
  [id: string]: {
    [property: string]: Array<[string, string | null]>;
  };
}

export const historyDataReducer = (
  state: HistoryDataState = {},
  action: Actions
): HistoryDataState => {
  switch (action.type) {
    case ActionTypes.DEVICE_DATA_ALL:
      return { ...action.payload.history };

    case ActionTypes.DEVICE_DATA_UPDATE:
      /** Merge history update if provided, clear history otherwise */
      if (action.payload.history !== null) {
        const deviceHistory = state[action.payload.id];
        action.payload.history.forEach(([key, newRecord]) => {
          if (!deviceHistory[key]) deviceHistory[key] = [];
          /** Add new record to top of array */
          deviceHistory[key].unshift(newRecord);
          /** Limit length to 10 by removing oldest records */
          while (deviceHistory[key].length > 10) deviceHistory[key].pop();
        });
        return { ...state, [action.payload.id]: deviceHistory };
      } else {
        const history = { ...state };
        delete history[action.payload.id];
        return history;
      }

    case ActionTypes.RESET_ALL:
      return {};

    default:
      return { ...state };
  }
};
