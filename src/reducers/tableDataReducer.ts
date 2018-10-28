import { Actions, ActionTypeKeys, TableDataState } from "../types";

const initialState = {};

export default (state: TableDataState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.DEVICE_DATA_ALL:
      return { ...action.state };
    case ActionTypeKeys.DEVICE_DATA_UPDATE:
      if (action.state === null) {
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      } else
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            ...action.state
          }
        };
    case ActionTypeKeys.RESET_ALL:
      return {} as TableDataState;
    default:
      return { ...state };
  }
};
