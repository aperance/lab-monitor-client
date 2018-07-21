export const SINGLE_ROW_SELECT = "SINGLE_ROW_SELECT";
export const MULTI_ROW_SELECT = "MULTI_ROW_SELECT";
export const VIEW_SELECT = "VIEW_SELECT";
export const HISTORY_SELECT = "HISTORY_SELECT";
export const DIALOG_VISIBILITY = "DIALOG_VISIBILITY";
export const PSTOOLS_RESPONSE = "PSTOOLS_RESPONSE";
export const DEVICE_DATA_ALL = "DEVICE_DATA_ALL";
export const DEVICE_DATA_UPDATE = "DEVICE_DATA_UPDATE";
export const RESET_ALL = "RESET_ALL";
export const ACTION_RESPONSE_SET = "ACTION_RESPONSE_SET";
export const ACTION_RESPONSE_CLEAR = "ACTION_RESPONSE_CLEAR";

export enum Actions {
  SINGLE_ROW_SELECT = "SINGLE_ROW_SELECT",
  MULTI_ROW_SELECT = "MULTI_ROW_SELECT",
  VIEW_SELECT = "VIEW_SELECT",
  HISTORY_SELECT = "HISTORY_SELECT",
  FILTER_SELECT = "FILTER_SELECT",
  DIALOG_VISIBILITY = "DIALOG_VISIBILITY",
  PSTOOLS_RESPONSE = "PSTOOLS_RESPONSE",
  DEVICE_DATA_ALL = "DEVICE_DATA_ALL",
  DEVICE_DATA_UPDATE = "DEVICE_DATA_UPDATE",
  RESET_ALL = "RESET_ALL",
  ACTION_RESPONSE_SET = "ACTION_RESPONSE_SET",
  ACTION_RESPONSE_CLEAR = "ACTION_RESPONSE_CLEAR"
}

export interface IDeviceDataAllAction {
  readonly type: Actions.DEVICE_DATA_ALL;
  readonly state: {
    [id: string]: {
      [property: string]: string;
    };
  };
  readonly history: {
    [id: string]: {
      [property: string]: Array<[string, string | null]>;
    };
  };
}

export interface IDeviceDataUpdateAction {
  readonly type: Actions.DEVICE_DATA_UPDATE;
  readonly id: string;
  readonly state: { [property: string]: string | null };
  readonly history: Array<[string, [string, string | null]]>;
}

export interface IResetAllAction {
  readonly type: Actions.RESET_ALL;
}

export interface ISingleRowSelectAction {
  readonly type: Actions.SINGLE_ROW_SELECT;
  readonly row: string;
}

export interface IMultiRowSelectAction {
  readonly type: Actions.MULTI_ROW_SELECT;
  readonly row: string;
}

export interface IViewSelectAction {
  readonly type: Actions.VIEW_SELECT;
  readonly view: string;
}

export interface IHistorySelectAction {
  readonly type: Actions.HISTORY_SELECT;
  readonly property: string;
}

export interface IFilterSelectAction {
  readonly type: Actions.FILTER_SELECT;
  readonly property: string;
  readonly regex: string;
}

export interface IPsToolsResponseAction {
  readonly type: Actions.PSTOOLS_RESPONSE;
  readonly err: Error | null;
  readonly result: string | null;
}

export interface IDialogVisibilityAction {
  readonly type: Actions.DIALOG_VISIBILITY;
  readonly logLevel: boolean;
}

export interface IActionResponseSet {
  readonly type: Actions.ACTION_RESPONSE_SET;
  readonly err: Error | null;
  readonly result: any;
}

export interface IActionResponseClear {
  readonly type: Actions.ACTION_RESPONSE_CLEAR;
}

export type IAction =
  | IDeviceDataAllAction
  | IDeviceDataUpdateAction
  | IResetAllAction
  | ISingleRowSelectAction
  | IMultiRowSelectAction
  | IViewSelectAction
  | IHistorySelectAction
  | IFilterSelectAction
  | IPsToolsResponseAction
  | IDialogVisibilityAction
  | IActionResponseSet
  | IActionResponseClear;
