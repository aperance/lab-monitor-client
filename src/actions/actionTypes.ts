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
  PSTOOLS_RESPONSE_CLEAR = "PSTOOLS_RESPONSE_CLEAR",
  DEVICE_DATA_ALL = "DEVICE_DATA_ALL",
  DEVICE_DATA_UPDATE = "DEVICE_DATA_UPDATE",
  RESET_ALL = "RESET_ALL",
  COMMAND_RESPONSE = "COMMAND_RESPONSE",
  DRAGGING_SET = "DRAGGING_SET"
}

interface ActionWithoutPayload<T> {
  type: T;
}

interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}

export type Actions =
  | ActionWithPayload<ActionTypes.DEVICE_DATA_ALL, DeviceDataAll>
  | ActionWithPayload<ActionTypes.DEVICE_DATA_UPDATE, DeviceDataUpdate>
  | ActionWithPayload<ActionTypes.PSTOOLS_RESPONSE, PsToolsResponse>
  | ActionWithoutPayload<ActionTypes.PSTOOLS_RESPONSE_CLEAR>
  | ActionWithPayload<ActionTypes.COMMAND_RESPONSE, CommandResponse>
  | ActionWithPayload<ActionTypes.SINGLE_ROW_SELECT, {row: string | null}>
  | ActionWithPayload<ActionTypes.MULTI_ROW_SELECT, {row: string | null}>
  | ActionWithPayload<ActionTypes.VIEW_SELECT, {view: string}>
  | ActionWithoutPayload<ActionTypes.PROXY_TOGGLE>
  | ActionWithPayload<ActionTypes.DRAGGING_SET, {isDragging: boolean}>
  | ActionWithoutPayload<ActionTypes.RESET_ALL>;
