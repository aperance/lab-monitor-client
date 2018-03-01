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

const selectedReducer = (state = { rows: [], view: null }, actions) => {
  const index = state.rows.indexOf(actions.row);
  switch (actions.type) {
    case "SINGLE_ROW_SELECT":
      if (state.rows.length === 1 && index === 0)
        return { rows: [], view: null };
      else return { ...state, rows: [actions.row] };
    case "MULTI_ROW_SELECT":
      const selectedRows = state.rows;
      if (index === -1) selectedRows.push(actions.row);
      else selectedRows.splice(index, 1);
      return { rows: selectedRows, view: null };
    case "UPDATE_SUB_VIEW":
      if (actions.view === state.view) return { ...state, view: null };
      else return { ...state, view: actions.view };
    default:
      return { ...state };
  }
};

export default combineReducers({
  configuration: configurationReducer,
  table: tableReducer,
  selected: selectedReducer
});
