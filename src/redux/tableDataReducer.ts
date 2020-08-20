import {Reducer} from "redux";
import {createReducer} from "@reduxjs/toolkit";
import {Actions} from "./actionCreators";
import {TableDataState} from "./store";

const initialState = {};

// export const tableDataReducer: Reducer<TableDataState, Actions> = (
//   state = initialState,
//   action
// ) => {
//   switch (action.type) {
//     case ActionTypes.DEVICE_DATA_ALL:
//       return {...action.payload.state};
//     case ActionTypes.DEVICE_DATA_UPDATE:
//       if (action.payload.state === null) {
//         const newState = {...state};
//         delete newState[action.payload.id];
//         return newState;
//       } else
//         return {
//           ...state,
//           [action.payload.id]: {
//             ...state[action.payload.id],
//             ...action.payload.state
//           }
//         };
//     case ActionTypes.RESET_ALL:
//       return {...initialState};
//     default:
//       return {...state};
//   }
// };

export const tableDataReducer: Reducer<TableDataState, Actions> = createReducer(
  {},
  {
    deviceDataAll: (state: TableDataState, action) => {
      return {...action.payload.state};
    },
    deviceDataUpdate: (state: TableDataState, action) => {
      if (action.payload.state === null) {
        const newState = {...state};
        delete newState[action.payload.id];
        return newState;
      } else
        return {
          ...state,
          [action.payload.id]: {
            ...state[action.payload.id],
            ...action.payload.state
          }
        };
    },
    resetAll: (state: TableDataState, action) => {
      return {};
    }
  }
);
