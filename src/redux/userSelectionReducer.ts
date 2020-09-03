/* eslint-disable no-case-declarations */
import { Reducer } from "redux";
import { Actions, ActionTypes, UserSelectionState } from "./types";

const initialState = {
  rows: [],
  view: null,
  proxy: true,
  dragging: false
};

export const userSelectionReducer: Reducer<UserSelectionState, Actions> = (
  state = initialState,
  action: Actions
) => {
  switch (action.type) {
    case ActionTypes.SINGLE_ROW_SELECT:
      if (
        action.payload.row === null ||
        (state.rows.length === 1 &&
          state.rows.indexOf(action.payload.row) === 0)
      )
        return { ...state, rows: [], view: null, history: null };
      else return { ...state, rows: [action.payload.row] };

    case ActionTypes.MULTI_ROW_SELECT:
      const rows: string[] = [...state.rows];
      if (action.payload.row === null) return { ...state };
      else if (rows.indexOf(action.payload.row) === -1)
        rows.push(action.payload.row);
      else rows.splice(rows.indexOf(action.payload.row), 1);
      return { ...state, rows, view: null, history: null };

    case ActionTypes.VIEW_SELECT:
      if (action.payload.view === state.view || state.rows.length !== 1)
        return { ...state, view: null, history: null };
      else return { ...state, view: action.payload.view, history: null };

    case ActionTypes.PROXY_TOGGLE:
      return { ...state, proxy: !state.proxy };

    case ActionTypes.DRAGGING_SET:
      return { ...state, dragging: action.payload.isDragging };

    case ActionTypes.DEVICE_DATA_UPDATE:
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
