import { CONFIGURATION } from "../actions/actionTypes";

const initialState = {
  columns: [],
  filters: [],
  logLevel: { level: [], namespace: [] }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CONFIGURATION:
      return { ...action.configuration };
    default:
      return { ...state };
  }
};
