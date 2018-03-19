import { DEVICE_DATA_ALL, DEVICE_DATA_UPDATE } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case DEVICE_DATA_ALL:
      return { ...action.state };
    case DEVICE_DATA_UPDATE:
      return {
        ...state,
        [action.id]: { ...state[action.id], ...action.state }
      };
    default:
      return { ...state };
  }
};
