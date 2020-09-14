import { Actions, ActionTypes } from "./actionCreators";

export interface TableDataState {
  [id: string]: {
    [property: string]: string | null;
  };
}

export const tableDataReducer = (
  state: TableDataState = {},
  action: Actions
): TableDataState => {
  switch (action.type) {
    case ActionTypes.DEVICE_DATA_ALL:
      return { ...action.payload.state };

    case ActionTypes.DEVICE_DATA_UPDATE: {
      const newState = { ...state };
      /** Merge state update if provided, clear state otherwise */
      if (action.payload.state !== null)
        newState[action.payload.id] = {
          ...state[action.payload.id],
          ...action.payload.state
        };
      else delete newState[action.payload.id];
      return newState;
    }

    case ActionTypes.RESET_ALL:
      return {};

    default:
      return { ...state };
  }
};
