import { combineReducers } from "redux";

const configurationReducer = (state = { columns: [] }, actions) => {
  switch (actions.type) {
    case "SET_CONFIGURATION":
      return { ...actions.configuration };
    default:
      return { ...state };
  }
};

const tableReducer = (state = {}, actions) => {
  switch (actions.type) {
    case "POPULATE_TABLE":
      return { ...actions.allRows };
    case "UPDATE_ROW":
      return {
        ...state,
        [actions.id]: { ...state[actions.id], ...actions.changes }
      };
    default:
      return { ...state };
  }
};

const selectedReducer = (state = [], actions) => {
  switch (actions.type) {
    case "UPDATE_SELECTED":
      let newState = [...state];
      const index = newState.indexOf(actions.id);
      if (index === -1) newState.push(actions.id);
      else newState.splice(index, 1);
      return newState;
    default:
      return [...state];
  }
};

export default combineReducers({
  configuration: configurationReducer,
  table: tableReducer,
  selected: selectedReducer
});
