import {
  CONFIGURATION,
  DEVICE_DATA_ALL,
  DEVICE_DATA_UPDATE,
  SINGLE_ROW_SELECT,
  MULTI_ROW_SELECT,
  VIEW_SELECT,
  HISTORY_SELECT,
  DIALOG_VISIBILITY,
  PSTOOLS_RESPONSE,
  FILTER_SELECT,
  ACTION_RESPONSE_SET,
  ACTION_RESPONSE_CLEAR
} from "./actionTypes";

export const configuration = ({ configuration }) => {
  return { type: CONFIGURATION, configuration };
};

export const deviceDataAll = ({ state, history }) => {
  return { type: DEVICE_DATA_ALL, state, history };
};

export const deviceDataUpdate = ({ id, state, history }) => {
  return { type: DEVICE_DATA_UPDATE, id, state, history };
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

export const psToolsResponse = response => {
  return { type: PSTOOLS_RESPONSE, response };
};

export const filterSelect = (property, option) => {
  return { type: FILTER_SELECT, property, option };
};

export const actionResponseSet = response => {
  return { type: ACTION_RESPONSE_SET, response };
};

export const actionResponseClear = () => {
  return { type: ACTION_RESPONSE_CLEAR };
};
