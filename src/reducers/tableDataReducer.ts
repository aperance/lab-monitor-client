import { Actions, IAction } from "../actions/actionTypes";
import { TableDataState } from "../types";

const initialState = {};

export default (state: TableDataState = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.DEVICE_DATA_ALL:
      return { ...action.state };
    case Actions.DEVICE_DATA_UPDATE:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          ...action.state
        }
      };
    case Actions.RESET_ALL:
      return {} as TableDataState;
    default:
      return { ...state };
  }
};
