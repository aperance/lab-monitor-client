import {
  Actions,
  IDeviceDataAllAction,
  IDeviceDataUpdateAction,
  IResetAllAction,
  ISingleRowSelectAction,
  IMultiRowSelectAction,
  IViewSelectAction,
  IHistorySelectAction,
  IPsToolsResponseAction,
  IDialogVisibilityAction,
  IActionResponseSet,
  IActionResponseClear
} from "./actionTypes";

export const deviceDataAll = (
  state: {
    [id: string]: {
      [property: string]: string;
    };
  },
  history: {
    [id: string]: {
      [property: string]: Array<[string, string | null]>;
    };
  }
): IDeviceDataAllAction => {
  return { type: Actions.DEVICE_DATA_ALL, state, history };
};

export const deviceDataUpdate = (
  id: string,
  state: { [property: string]: string | null },
  history: Array<[string, [string, string | null]]>
): IDeviceDataUpdateAction => {
  return { type: Actions.DEVICE_DATA_UPDATE, id, state, history };
};

export const resetAll = (): IResetAllAction => {
  return { type: Actions.RESET_ALL };
};

export const singleRowSelect = (row: string): ISingleRowSelectAction => {
  return { type: Actions.SINGLE_ROW_SELECT, row };
};

export const multiRowSelect = (row: string): IMultiRowSelectAction => {
  return { type: Actions.MULTI_ROW_SELECT, row };
};

export const viewSelect = (view: string): IViewSelectAction => {
  return { type: Actions.VIEW_SELECT, view };
};

export const historySelect = (property: string): IHistorySelectAction => {
  return { type: Actions.HISTORY_SELECT, property };
};

export const dialogVisibility = ({
  logLevel
}: {
  logLevel: boolean;
}): IDialogVisibilityAction => {
  return { type: Actions.DIALOG_VISIBILITY, logLevel };
};

export const psToolsResponse = (
  err: Error,
  result: string
): IPsToolsResponseAction => {
  return { type: Actions.PSTOOLS_RESPONSE, result, err };
};

export const actionResponseSet = (
  err: Error,
  result: any
): IActionResponseSet => {
  return { type: Actions.ACTION_RESPONSE_SET, err, result };
};

export const actionResponseClear = (): IActionResponseClear => {
  return { type: Actions.ACTION_RESPONSE_CLEAR };
};
