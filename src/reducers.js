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
      const index = state.indexOf(actions.id);
      if (actions.multi) {
        let newState = [...state];
        if (index === -1) newState.push(actions.id);
        else newState.splice(index, 1);
        return newState;
      } else {
        if (state.length === 1 && index === 0) return [];
        else return [actions.id];
      }
    default:
      return [...state];
  }
};

export default combineReducers({
  configuration: configurationReducer,
  table: tableReducer,
  selected: selectedReducer
});
