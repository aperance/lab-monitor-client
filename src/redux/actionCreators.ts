import {
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  CommandResponse
} from "../websockets/messageTypes";
import {Actions, ActionTypes} from "./reduxTypes";

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

export const singleRowSelect = (row: string | null): Actions => ({
  type: ActionTypes.SINGLE_ROW_SELECT,
  payload: {row}
});

export const multiRowSelect = (row: string | null): Actions => ({
  type: ActionTypes.MULTI_ROW_SELECT,
  payload: {row}
});

export const viewSelect = (view: string): Actions => ({
  type: ActionTypes.VIEW_SELECT,
  payload: {view}
});

export const proxyToggle = (): Actions => ({
  type: ActionTypes.PROXY_TOGGLE
});

export const draggingSet = (isDragging: boolean): Actions => ({
  type: ActionTypes.DRAGGING_SET,
  payload: {isDragging}
});

export const resetAll = (): Actions => ({
  type: ActionTypes.RESET_ALL
});
