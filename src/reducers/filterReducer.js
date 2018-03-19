import { FILTER_SELECT } from "../actions/actionTypes";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FILTER_SELECT:
      const newArray = state[action.property] || [];
      const currentIndex = newArray.indexOf(action.option);
      if (currentIndex === -1) newArray.push(action.option);
      else newArray.splice(currentIndex, 1);
      return { ...state, [action.property]: [...newArray] };
    default:
      return { ...state };
  }
};
