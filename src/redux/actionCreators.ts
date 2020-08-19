import {
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  CommandResponse
} from "../websockets/messageTypes";

interface ActionWithoutPayload<T> {
  type: T;
}

interface ActionWithPayload<T, P> {
  type: T;
  payload: P;
}

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

export const deviceDataAll = (payload: DeviceDataAll): Actions => ({
  type: ActionTypes.DEVICE_DATA_ALL,
  payload
});

export const deviceDataUpdate = (payload: DeviceDataUpdate): Actions => ({
  type: ActionTypes.DEVICE_DATA_UPDATE,
  payload
});

export const psToolsResponse = (payload: PsToolsResponse): Actions => ({
  type: ActionTypes.PSTOOLS_RESPONSE,
  payload
});

export const psToolsResponseClear = (): Actions => ({
  type: ActionTypes.PSTOOLS_RESPONSE_CLEAR
});

export const deviceCommandResponse = (payload: CommandResponse): Actions => ({
  type: ActionTypes.COMMAND_RESPONSE,
  payload
});

export const singleRowSelect = (payload: {row: string | null}): Actions => ({
  type: ActionTypes.SINGLE_ROW_SELECT,
  payload
});

export const multiRowSelect = (payload: {row: string | null}): Actions => ({
  type: ActionTypes.MULTI_ROW_SELECT,
  payload
});

export const viewSelect = (payload: {view: string}): Actions => ({
  type: ActionTypes.VIEW_SELECT,
  payload
});

export const proxyToggle = (): Actions => ({
  type: ActionTypes.PROXY_TOGGLE
});

export const draggingSet = (payload: {isDragging: boolean}): Actions => ({
  type: ActionTypes.DRAGGING_SET,
  payload
});

export const resetAll = (): Actions => ({
  type: ActionTypes.RESET_ALL
});
