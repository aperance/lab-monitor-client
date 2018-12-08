import {
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  CommandResponse
} from "../websockets/messageTypes";

export enum ActionTypeKeys {
  SINGLE_ROW_SELECT = "SINGLE_ROW_SELECT",
  MULTI_ROW_SELECT = "MULTI_ROW_SELECT",
  VIEW_SELECT = "VIEW_SELECT",
  PROXY_TOGGLE = "PROXY_TOGGLE",
  PSTOOLS_RESPONSE = "PSTOOLS_RESPONSE",
  DEVICE_DATA_ALL = "DEVICE_DATA_ALL",
  DEVICE_DATA_UPDATE = "DEVICE_DATA_UPDATE",
  RESET_ALL = "RESET_ALL",
  COMMAND_RESPONSE = "COMMAND_RESPONSE",
  DRAGGING_SET = "DRAGGING_SET"
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

export interface ProxyToggleAction {
  readonly type: ActionTypeKeys.PROXY_TOGGLE;
}

export interface PsToolsResponseAction extends PsToolsResponse {
  readonly type: ActionTypeKeys.PSTOOLS_RESPONSE;
}

export interface CommandResponseAction extends CommandResponse {
  readonly type: ActionTypeKeys.COMMAND_RESPONSE;
}

export interface DraggingSetAction {
  readonly type: ActionTypeKeys.DRAGGING_SET;
  readonly isDragging: boolean;
}

export type Actions =
  | DeviceDataAllAction
  | DeviceDataUpdateAction
  | ResetAllAction
  | SingleRowSelectAction
  | MultiRowSelectAction
  | ViewSelectAction
  | ProxyToggleAction
  | PsToolsResponseAction
  | CommandResponseAction
  | DraggingSetAction;
