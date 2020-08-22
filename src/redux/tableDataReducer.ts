import {Reducer} from "redux";
import {Actions, ActionTypes, TableDataState} from "./reduxTypes";

const initialState = {};

export const tableDataReducer: Reducer<TableDataState, Actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionTypes.DEVICE_DATA_ALL:
      return {...action.payload.state};
    case ActionTypes.DEVICE_DATA_UPDATE:
      if (action.payload.state === null) {
        const newState = {...state};
        delete newState[action.payload.id];
        return newState;
      } else
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            ...action.payload.state
          }
        };
    case ActionTypes.RESET_ALL:
      return {...initialState};
    default:
      return {...state};
  }
};
