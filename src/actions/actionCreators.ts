import {
  DEVICE_DATA_ALL,
  DEVICE_DATA_UPDATE,
  RESET_ALL,
  SINGLE_ROW_SELECT,
  MULTI_ROW_SELECT,
  VIEW_SELECT,
  HISTORY_SELECT,
  DIALOG_VISIBILITY,
  PSTOOLS_RESPONSE,
  ACTION_RESPONSE_SET,
  ACTION_RESPONSE_CLEAR
} from "./actionTypes";

export const deviceDataAll = ({ state, history }) => {
  return { type: DEVICE_DATA_ALL, state, history };
};

export const deviceDataUpdate = ({ id, state, history }) => {
  return { type: DEVICE_DATA_UPDATE, id, state, history };
};

export const resetAll = () => {
  return { type: RESET_ALL };
};

export const singleRowSelect = row => {
  return { type: SINGLE_ROW_SELECT, row };
};

export const multiRowSelect = row => {
  return { type: MULTI_ROW_SELECT, row };
};

export const viewSelect = view => {
  return { type: VIEW_SELECT, view };
};

export const historySelect = property => {
  return { type: HISTORY_SELECT, property };
};

export const dialogVisibility = object => {
  return { type: DIALOG_VISIBILITY, object };
};

export const psToolsResponse = ({ result }) => {
  return { type: PSTOOLS_RESPONSE, result };
};

export const actionResponseSet = result => {
  return { type: ACTION_RESPONSE_SET, result };
};

export const actionResponseClear = () => {
  return { type: ACTION_RESPONSE_CLEAR };
};
