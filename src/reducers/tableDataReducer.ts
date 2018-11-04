import { Actions, ActionTypeKeys } from "../actions/actionTypes";

interface State {
  [id: string]: {
    [property: string]: string | null;
  };
}

const initialState = {};

const tableDataReducer = (state: State = initialState, action: Actions) => {
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
      return {} as State;
    default:
      return { ...state };
  }
};

export { tableDataReducer, State as TableDataState };
