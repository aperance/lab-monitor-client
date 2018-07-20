import {
  SINGLE_ROW_SELECT,
  MULTI_ROW_SELECT,
  VIEW_SELECT,
  HISTORY_SELECT,
  RESET_ALL
} from "../actions/actionTypes";

interface IState {
  rows: string[];
  view: string | null;
  history: string | null;
}

interface IAction {
  type: string;
  row?: string;
  view?: string;
  property?: string;
}

const initialState: IState = { rows: [], view: null, history: null };

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case SINGLE_ROW_SELECT:
      if (action.row === undefined) return { ...state };

      if (
        action.row === null ||
        (state.rows.length === 1 && state.rows.indexOf(action.row) === 0)
      )
        return { rows: [], view: null, history: null };
      else return { ...state, rows: [action.row] };

    case MULTI_ROW_SELECT:
      if (action.row === undefined) return { ...state };

      const rows: string[] = [...state.rows];
      if (rows.indexOf(action.row) === -1) rows.push(action.row);
      else rows.splice(rows.indexOf(action.row), 1);
      return { rows, view: null, history: null };

    case VIEW_SELECT:
      if (action.view === undefined) return { ...state };

      if (action.view === state.view || state.rows.length !== 1)
        return { ...state, view: null, history: null };
      else return { ...state, view: action.view, history: null };

    case HISTORY_SELECT:
      if (action.property === undefined) return { ...state };

      if (action.property === state.history) return { ...state, history: null };
      else return { ...state, history: action.property };

    case RESET_ALL:
      return { ...initialState };

    default:
      return { ...state };
  }
};
