import { combineReducers } from "redux";

const tableReducer = (
  state = { header: [], rows: {}, rowOrder: [] },
  actions
) => {
  switch (actions.type) {
    case "TABLE_POPULATE":
      return { ...actions.tableData };
    case "TABLE_UPDATE":
      return { ...state, rows: { ...state.rows, ...actions.updatedRow } };
    default:
      return { ...state };
  }
};

const selectedReducer = (state = [], actions) => {
  switch (actions.type) {
    case "SET_SELECTED":
      return actions.selected;
    default:
      return [...state];
  }
};

export default combineReducers({
  table: tableReducer,
  selected: selectedReducer
});
