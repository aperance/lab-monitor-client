import { combineReducers } from "redux";

const configurationReducer = (
  state = { columns: [], filters: [], logLevel: { level: [], namespace: [] } },
  actions
) => {
  switch (actions.type) {
    case "CONFIGURATION":
      return { ...actions.configuration };
    default:
      return { ...state };
  }
};

const tableReducer = (state = {}, actions) => {
  switch (actions.type) {
    case "DEVICE_DATA_ALL":
      return { ...actions.state };
    case "DEVICE_DATA_UPDATE":
      return {
        ...state,
        [actions.id]: { ...state[actions.id], ...actions.state }
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
    case "DEVICE_DATA_ALL":
      return { ...actions.history };
    case "DEVICE_DATA_UPDATE":
      return {
        ...state,
        [actions.id]: actions.history.reduce(
          (acc, [key, newRecord]) => {
            if (!acc[key]) acc[key] = [];
            acc[key] = [newRecord, ...acc[key]];
            return acc;
          },
          { ...state[actions.id] }
        )
      };
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

const filterReducer = (state = {}, actions) => {
  switch (actions.type) {
    case "FILTER_SELECT":
      const newArray = state[actions.property] || [];
      const currentIndex = newArray.indexOf(actions.option);
      if (currentIndex === -1) newArray.push(actions.option);
      else newArray.splice(currentIndex, 1);
      return { ...state, [actions.property]: [...newArray] };
    default:
      return { ...state };
  }
};

const psToolsReducer = (state = { response: null }, actions) => {
  switch (actions.type) {
    case "PSTOOLS_RESPONSE":
      return { ...state, response: actions.response };
    default:
      return { ...state };
  }
};

export default combineReducers({
  configuration: configurationReducer,
  table: tableReducer,
  selected: selectedReducer,
  history: historyReducer,
  dialog: dialogReducer,
  filter: filterReducer,
  psTools: psToolsReducer
});
