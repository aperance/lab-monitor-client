import { Actions, ActionTypeKeys, UserSelectionState } from "../types";

const initialState = { rows: [], view: null, history: null, filters: {} };

export default (state: UserSelectionState = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.SINGLE_ROW_SELECT:
      if (
        action.row === null ||
        (state.rows.length === 1 && state.rows.indexOf(action.row) === 0)
      )
        return { ...state, rows: [], view: null, history: null };
      else return { ...state, rows: [action.row] };

    case ActionTypeKeys.MULTI_ROW_SELECT:
      const rows: string[] = [...state.rows];
      if (rows.indexOf(action.row) === -1) rows.push(action.row);
      else rows.splice(rows.indexOf(action.row), 1);
      return { ...state, rows, view: null, history: null };

    case ActionTypeKeys.VIEW_SELECT:
      if (action.view === state.view || state.rows.length !== 1)
        return { ...state, view: null, history: null };
      else return { ...state, view: action.view, history: null };

    case ActionTypeKeys.HISTORY_SELECT:
      if (action.property === state.history) return { ...state, history: null };
      else return { ...state, history: action.property };

    case ActionTypeKeys.FILTER_SELECT:
      const regexArray = state.filters[action.property] || [];
      const currentIndex = regexArray.indexOf(action.regex);
      currentIndex === -1
        ? regexArray.push(action.regex)
        : regexArray.splice(currentIndex, 1);
      return {
        ...state,
        filters: { ...state.filters, [action.property]: regexArray }
      };

    case ActionTypeKeys.RESET_ALL:
      return { ...initialState };

    default:
      return { ...state };
  }
};
