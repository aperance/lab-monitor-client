/** WebSocket Message Types */

export enum WsMessageTypeKeys {
  Configuration = "CONFIGURATION",
  DeviceDataAll = "DEVICE_DATA_ALL",
  DeviceDataUpdate = "DEVICE_DATA_UPDATE",
  RefreshDevice = "REFRESH_DEVICE",
  ClearDevice = "CLEAR_DEVICE",
  DeviceAction = "DEVICE_ACTION",
  DeviceActionResponse = "DEVICE_ACTION_RESPONSE",
  PsToolsCommand = "PSTOOLS_COMMAND",
  PsToolsCommandResponse = "PSTOOLS_COMMAND_RESPONSE",
  UserDialog = "USER_DIALOG",
  Error = "ERROR"
}

export interface WsMessage {
  readonly type: WsMessageTypeKeys;
  // @ts-ignore
  readonly payload: unknown;
}

export interface DeviceDataAll {
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

export interface DeviceDataUpdate {
  readonly id: string;
  readonly state: { [property: string]: string | null };
  readonly history: Array<[string, [string, string | null]]>;
}

export interface PsToolsRequest {
  readonly target: string;
  readonly mode: string;
  readonly argument: string;
}

export interface PsToolsResponse {
  readonly err: Error | null;
  readonly result: string | null;
}

export interface DeviceActionRequest {
  readonly targets: string[];
  readonly type: string;
  readonly parameters: any;
}

export interface DeviceActionResponse {
  readonly err: Error | null;
  readonly results: Array<{
    err: Error | null;
    success: boolean;
  }> | null;
}

export interface RefreshDeviceRequest {
  readonly targets: string[];
}

export interface ClearDeviceRequest {
  readonly targets: string[];
}

/** Non-WS Interfaces */

export interface ErrorMessage {
  readonly err: Error | null;
}

export type RowData = [string, { [x: string]: string | null }];

/** Redux Action Types */

export enum ActionTypeKeys {
  SINGLE_ROW_SELECT = "SINGLE_ROW_SELECT",
  MULTI_ROW_SELECT = "MULTI_ROW_SELECT",
  VIEW_SELECT = "VIEW_SELECT",
  HISTORY_SELECT = "HISTORY_SELECT",
  FILTER_SELECT = "FILTER_SELECT",
  PROXY_TOGGLE = "PROXY_TOGGLE",
  PSTOOLS_RESPONSE = "PSTOOLS_RESPONSE",
  CONFIGURATION = "CONFIGURATION",
  DEVICE_DATA_ALL = "DEVICE_DATA_ALL",
  DEVICE_DATA_UPDATE = "DEVICE_DATA_UPDATE",
  RESET_ALL = "RESET_ALL",
  ACTION_RESPONSE_SET = "ACTION_RESPONSE_SET",
  ACTION_RESPONSE_CLEAR = "ACTION_RESPONSE_CLEAR"
}

export interface ConfigurationAction {
  readonly type: ActionTypeKeys.CONFIGURATION;
  readonly configuration: any;
}

export interface DeviceDataAllAction extends DeviceDataAll {
  readonly type: ActionTypeKeys.DEVICE_DATA_ALL;
}

export interface DeviceDataUpdateAction extends DeviceDataUpdate {
  readonly type: ActionTypeKeys.DEVICE_DATA_UPDATE;
}

export interface ResetAllAction {
  readonly type: ActionTypeKeys.RESET_ALL;
}

export interface SingleRowSelectAction {
  readonly type: ActionTypeKeys.SINGLE_ROW_SELECT;
  readonly row: string | null;
}

export interface MultiRowSelectAction {
  readonly type: ActionTypeKeys.MULTI_ROW_SELECT;
  readonly row: string | null;
}

export interface ViewSelectAction {
  readonly type: ActionTypeKeys.VIEW_SELECT;
  readonly view: string;
}

export interface HistorySelectAction {
  readonly type: ActionTypeKeys.HISTORY_SELECT;
  readonly property: string;
}

export interface FilterSelectAction {
  readonly type: ActionTypeKeys.FILTER_SELECT;
  readonly property: string;
  readonly regex: string;
}

export interface ProxyToggleAction {
  readonly type: ActionTypeKeys.PROXY_TOGGLE;
}

export interface PsToolsResponseAction extends PsToolsResponse {
  readonly type: ActionTypeKeys.PSTOOLS_RESPONSE;
}

export interface DeviceActionResponseSetAction extends DeviceActionResponse {
  readonly type: ActionTypeKeys.ACTION_RESPONSE_SET;
}

export interface DeviceActionResponseClearAction {
  readonly type: ActionTypeKeys.ACTION_RESPONSE_CLEAR;
}

export type Actions =
  | ConfigurationAction
  | DeviceDataAllAction
  | DeviceDataUpdateAction
  | ResetAllAction
  | SingleRowSelectAction
  | MultiRowSelectAction
  | ViewSelectAction
  | HistorySelectAction
  | FilterSelectAction
  | ProxyToggleAction
  | PsToolsResponseAction
  | DeviceActionResponseSetAction
  | DeviceActionResponseClearAction;

/** Redux State Types */

export interface ActionResponseState {
  err: Error | null;
  results: any[] | null;
}

export interface HistoryDataState {
  [id: string]: {
    [property: string]: Array<[string, string | null]>;
  };
}

export interface PsToolsState {
  err: Error | null;
  result: string | null;
}

export interface TableDataState {
  [id: string]: {
    [property: string]: string | null;
  };
}

export interface UserSelectionState {
  rows: string[];
  view: string | null;
  history: string | null;
  filters: {
    [property: string]: string[];
  };
  proxy: boolean;
}

export interface StoreState {
  configuration: any;
  tableData: TableDataState;
  userSelection: UserSelectionState;
  historyData: HistoryDataState;
  psTools: PsToolsState;
  actionResponse: ActionResponseState;
}
