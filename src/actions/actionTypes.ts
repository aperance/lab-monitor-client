import {
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  DeviceActionResponse
} from "../websockets/messageTypes";

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
  ACTION_RESPONSE_CLEAR = "ACTION_RESPONSE_CLEAR",
  DRAGGING_SET = "DRAGGING_SET"
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

export interface DraggingSetAction {
  readonly type: ActionTypeKeys.DRAGGING_SET;
  readonly isDragging: boolean;
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
  | DeviceActionResponseClearAction
  | DraggingSetAction;
