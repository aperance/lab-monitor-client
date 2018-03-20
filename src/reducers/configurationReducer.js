import { CONFIGURATION, RESET_ALL } from "../actions/actionTypes";

const initialState = {
  columns: [],
  filters: [],
  logLevel: { level: [], namespace: [] }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIGURATION:
      return { ...action.configuration };
    case RESET_ALL:
      return { ...initialState };
    default:
      return { ...state };
  }
};
