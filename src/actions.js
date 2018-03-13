export const singleRowSelect = row => {
  return { type: "SINGLE_ROW_SELECT", row };
};

export const multiRowSelect = row => {
  return { type: "MULTI_ROW_SELECT", row };
};

export const viewSelect = view => {
  return { type: "VIEW_SELECT", view };
};

export const historySelect = property => {
  return { type: "HISTORY_SELECT", property };
};

export const dialogVisibility = object => {
  return { type: "DIALOG_VISIBILITY", object };
};

export const psToolsResponse = response => {
  return { type: "PSTOOLS_RESPONSE", response };
};

export const filterSelect = (property, option) => {
  return { type: "FILTER_SELECT", property, option };
};
