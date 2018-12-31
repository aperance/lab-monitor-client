import { ActionTypes, Actions } from "./actionTypes";
import {
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  CommandResponse
} from "../websockets/messageTypes";

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

export const singleRowSelect = (payload: { row: string | null }): Actions => ({
  type: ActionTypes.SINGLE_ROW_SELECT,
  payload
});

export const multiRowSelect = (payload: { row: string | null }): Actions => ({
  type: ActionTypes.MULTI_ROW_SELECT,
  payload
});

export const viewSelect = (payload: { view: string }): Actions => ({
  type: ActionTypes.VIEW_SELECT,
  payload
});

export const proxyToggle = (): Actions => ({
  type: ActionTypes.PROXY_TOGGLE
});

export const draggingSet = (payload: { isDragging: boolean }): Actions => ({
  type: ActionTypes.DRAGGING_SET,
  payload
});

export const resetAll = (): Actions => ({
  type: ActionTypes.RESET_ALL
});
