import { Reducer } from "redux";
import { Actions, ActionTypes } from "../actions/actionTypes";
import { HistoryDataState } from "../store/storeTypes";

const initialState = {};

export const historyDataReducer: Reducer<HistoryDataState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.DEVICE_DATA_ALL:
      return { ...action.payload.history };

    case ActionTypes.DEVICE_DATA_UPDATE:
      if (action.payload.history === null) {
        const newHistory = { ...state };
        delete newHistory[action.payload.id];
        return newHistory;
      } else
        return {
          ...state,
          [action.payload.id]: action.payload.history.reduce(
            (acc, [key, newRecord]) => {
              if (!acc[key]) acc[key] = [];
              acc[key] = [newRecord, ...acc[key]];
              while (acc[key].length > 10) acc[key].pop();
              return acc;
            },
            { ...state[action.payload.id] }
          )
        };

    case ActionTypes.RESET_ALL:
      return {};

    default:
      return { ...state };
  }
};
