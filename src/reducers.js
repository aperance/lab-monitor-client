import { combineReducers } from "redux";

const configurationReducer = (
  state = { columns: [], logLevel: { level: [], namespace: [] } },
  actions
) => {
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

const selectedReducer = (
  state = { rows: [], view: null, history: null },
  actions
) => {
  switch (actions.type) {
    case "SINGLE_ROW_SELECT":
      if (state.rows.length === 1 && state.rows.indexOf(actions.row) === 0)
        return { rows: [], view: null, history: null };
      else return { ...state, rows: [actions.row] };

    case "MULTI_ROW_SELECT":
      const rows = [...state.rows];
      if (rows.indexOf(actions.row) === -1) rows.push(actions.row);
      else rows.splice(rows.indexOf(actions.row), 1);
      return { rows, view: null, history: null };

    case "VIEW_SELECT":
      if (actions.view === state.view || state.rows.length !== 1)
        return { ...state, view: null, history: null };
      else return { ...state, view: actions.view, history: null };

    case "HISTORY_SELECT":
      if (actions.property === state.history)
        return { ...state, history: null };
      else return { ...state, history: actions.property };

    default:
      return { ...state };
  }
};

const historyReducer = (state = {}, actions) => {
  switch (actions.type) {
    case "POPULATE_HISTORY":
      return { ...actions.allRows };
    default:
      return { ...state };
  }
};

const dialogReducer = (state = { logLevel: false }, actions) => {
  switch (actions.type) {
    case "DIALOG_VISIBILITY":
      return { ...state, ...actions.object };
    default:
      return { ...state };
  }
};

export default combineReducers({
  configuration: configurationReducer,
  table: tableReducer,
  selected: selectedReducer,
  history: historyReducer,
  dialog: dialogReducer
});
