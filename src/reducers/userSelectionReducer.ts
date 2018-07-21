import { Actions, IAction } from "../actions/actionTypes";

interface IState {
  rows: string[];
  view: string | null;
  history: string | null;
}

const initialState = { rows: [], view: null, history: null };

export default (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case Actions.SINGLE_ROW_SELECT:
      if (
        action.row === null ||
        (state.rows.length === 1 && state.rows.indexOf(action.row) === 0)
      )
        return { rows: [], view: null, history: null };
      else return { ...state, rows: [action.row] };

    case Actions.MULTI_ROW_SELECT:
      const rows: string[] = [...state.rows];
      if (rows.indexOf(action.row) === -1) rows.push(action.row);
      else rows.splice(rows.indexOf(action.row), 1);
      return { rows, view: null, history: null };

    case Actions.VIEW_SELECT:
      if (action.view === state.view || state.rows.length !== 1)
        return { ...state, view: null, history: null };
      else return { ...state, view: action.view, history: null };

    case Actions.HISTORY_SELECT:
      if (action.property === state.history) return { ...state, history: null };
      else return { ...state, history: action.property };

    case Actions.RESET_ALL:
      return { ...initialState };

    default:
      return { ...state };
  }
};
