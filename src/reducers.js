import { combineReducers } from "redux";

const tableReducer = (
  state = {
    header: ["A", "B", "C", "D", "E"],
    rows: [
      { id: "9001", data: ["1A", "1B", "1C", "1D", "1E"] },
      { id: "9002", data: ["2A", "2B", "2C", "2D", "2E"] },
      { id: "9003", data: ["3A", "3B", "3C", "3D", "3E"] },
      { id: "9004", data: ["4A", "4B", "4C", "4D", "4E"] },
      { id: "9005", data: ["5A", "5B", "5C", "5D", "5E"] },
      { id: "9006", data: ["6A", "6B", "6C", "6D", "6E"] }
    ]
  },
  actions
) => {
  return state;
};

const selectedReducer = (state = [], actions) => {
  switch (actions.type) {
    case "SET_SELECTED":
      return actions.selected;
    default:
      return state;
  }
};

export default combineReducers({
  table: tableReducer,
  selected: selectedReducer
});
