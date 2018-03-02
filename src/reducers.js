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

const selectedReducer = (
  state = { rows: [], view: null, history: { property: null, values: [] } },
  actions
) => {
  switch (actions.type) {
    case "SINGLE_ROW_SELECT":
      if (state.rows.length === 1 && state.rows.indexOf(actions.row) === 0)
        return {
          rows: [],
          view: null,
          history: { property: null, values: [] }
        };
      else
        return {
          rows: [actions.row],
          view: state.view,
          history: { ...state.history, values: [] }
        };

    case "MULTI_ROW_SELECT":
      const rows = state.rows;
      if (rows.indexOf(actions.row) === -1) rows.push(actions.row);
      else rows.splice(rows.indexOf(actions.row), 1);
      return {
        rows,
        view: null,
        history: { property: null, values: [] }
      };

    case "VIEW_SELECT":
      if (actions.view === state.view)
        return {
          ...state,
          view: null,
          history: { property: null, values: [] }
        };
      else
        return {
          ...state,
          view: actions.view,
          history: { property: null, values: [] }
        };

    case "HISTORY_SELECT":
      if (actions.property === state.history.property)
        return {
          ...state,
          history: { property: null, values: [] }
        };
      else
        return {
          ...state,
          history: { property: actions.property, values: [] }
        };

    case "HISTORY_POPULATE":
      if (
        state.rows.length === 1 &&
        state.rows.indexOf(actions.id) === 0 &&
        state.view === "history" &&
        state.history.property === actions.property
      )
        return {
          ...state,
          history: { property: actions.property, values: actions.values }
        };
      else
        return {
          ...state,
          history: { property: null, values: [] }
        };
    default:
      return { ...state };
  }
};

export default combineReducers({
  configuration: configurationReducer,
  table: tableReducer,
  selected: selectedReducer
});
