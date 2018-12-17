import {
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  CommandResponse
} from "../websockets/messageTypes";

export enum ActionTypes {
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

export interface Action<T, P> {
  type: T;
  payload: P;
}

export type Actions =
  | Action<ActionTypes.DEVICE_DATA_ALL, DeviceDataAll>
  | Action<ActionTypes.DEVICE_DATA_UPDATE, DeviceDataUpdate>
  | Action<ActionTypes.PSTOOLS_RESPONSE, PsToolsResponse>
  | Action<ActionTypes.COMMAND_RESPONSE, CommandResponse>
  | Action<ActionTypes.SINGLE_ROW_SELECT, { row: string | null }>
  | Action<ActionTypes.MULTI_ROW_SELECT, { row: string | null }>
  | Action<ActionTypes.VIEW_SELECT, { view: string }>
  | Action<ActionTypes.PROXY_TOGGLE, {}>
  | Action<ActionTypes.DRAGGING_SET, { isDragging: boolean }>
  | Action<ActionTypes.RESET_ALL, {}>;
