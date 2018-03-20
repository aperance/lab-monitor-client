import {
  SINGLE_ROW_SELECT,
  MULTI_ROW_SELECT,
  VIEW_SELECT,
  HISTORY_SELECT,
  RESET_ALL
} from "../actions/actionTypes";

const initialState = { rows: [], view: null, history: null };

export default (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_ROW_SELECT:
      if (state.rows.length === 1 && state.rows.indexOf(action.row) === 0)
        return { rows: [], view: null, history: null };
      else return { ...state, rows: [action.row] };

    case MULTI_ROW_SELECT:
      const rows = [...state.rows];
      if (rows.indexOf(action.row) === -1) rows.push(action.row);
      else rows.splice(rows.indexOf(action.row), 1);
      return { rows, view: null, history: null };

    case VIEW_SELECT:
      if (action.view === state.view || state.rows.length !== 1)
        return { ...state, view: null, history: null };
      else return { ...state, view: action.view, history: null };

    case HISTORY_SELECT:
      if (action.property === state.history) return { ...state, history: null };
      else return { ...state, history: action.property };

    case RESET_ALL:
      return { ...initialState };

    default:
      return { ...state };
  }
};
