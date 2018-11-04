import { Actions, ActionTypeKeys } from "../actions/actionTypes";

interface State {
  rows: string[];
  view: string | null;
  history: string | null;
  filters: {
    [property: string]: string[];
  };
  proxy: boolean;
}

const initialState = {
  rows: [],
  view: null,
  history: null,
  filters: {},
  proxy: true
};

const userSelectionReducer = (state: State = initialState, action: Actions) => {
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
      if (action.row === null) return { ...state };
      else if (rows.indexOf(action.row) === -1) rows.push(action.row);
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
        rows: [],
        view: null,
        history: null,
        filters: { ...state.filters, [action.property]: regexArray }
      };

    case ActionTypeKeys.PROXY_TOGGLE:
      return { ...state, proxy: !state.proxy };

    case ActionTypeKeys.DEVICE_DATA_UPDATE:
      if (action.state === null)
        return { ...state, rows: state.rows.filter(x => x !== action.id) };
      else return { ...state };

    case ActionTypeKeys.RESET_ALL:
      return { ...initialState };

    default:
      return { ...state };
  }
};

export { userSelectionReducer, State as UserSelectionState };
