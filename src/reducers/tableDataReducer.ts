import { Actions, ActionTypeKeys } from "../actions/actionTypes";

interface TableDataState {
  [id: string]: {
    [property: string]: string | null;
  };
}

const initialState: TableDataState = {};

const tableDataReducer = (state = initialState, action: Actions) => {
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
      return { ...initialState };
    default:
      return { ...state };
  }
};

export { tableDataReducer, TableDataState };
