import { Reducer } from "redux";
import { Actions, ActionTypes, UserSelectionState } from "./types";

const initialState = {
  rows: [],
  view: null,
  proxy: true,
  dragging: false
};

export const userSelectionReducer: Reducer = (
  state: UserSelectionState = initialState,
  action: Actions
): UserSelectionState => {
  switch (action.type) {
    case ActionTypes.SINGLE_ROW_SELECT:
      /** Deselect row if null received */
      if (action.payload.row === null)
        return { ...state, rows: [], view: null };
      /** Deselect row if its already selected */
      if (state.rows.length === 1 && state.rows[0] === action.payload.row)
        return { ...state, rows: [], view: null };
      /** Select row otherwise */
      return { ...state, rows: [action.payload.row] };

    case ActionTypes.MULTI_ROW_SELECT: {
      if (action.payload.row === null) return { ...state };
      const newRows = [...state.rows];
      /** Select row if its not already selected, descelect row otherwise */
      if (newRows.includes(action.payload.row))
        newRows.splice(newRows.indexOf(action.payload.row), 1);
      else newRows.push(action.payload.row); //
      return { ...state, rows: newRows, view: null };
    }

    case ActionTypes.VIEW_SELECT:
      /** Close view if no rows are selected */
      if (state.rows.length !== 1) return { ...state, view: null };
      /** Close view if same view is already open */
      if (action.payload.view === state.view) return { ...state, view: null };
      /** Otherwise open specified view */
      return { ...state, view: action.payload.view };

    case ActionTypes.PROXY_TOGGLE:
      return { ...state, proxy: !state.proxy };

    case ActionTypes.DRAGGING_SET:
      return { ...state, dragging: action.payload.isDragging };

    case ActionTypes.DEVICE_DATA_UPDATE:
      /** Ensure row is no longer selected if deleted from table */
      if (action.payload.state === null)
        return {
          ...state,
          rows: state.rows.filter((x) => x !== action.payload.id)
        };
      else return { ...state };

    case ActionTypes.RESET_ALL:
      return { ...initialState };

    default:
      return { ...state };
  }
};
