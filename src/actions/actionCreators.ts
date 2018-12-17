import { ActionTypes, Action } from "./actionTypes";
import {
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  CommandResponse
} from "../websockets/messageTypes";

const createAction = <T, P>(type: T, payload: P): Action<T, P> => {
  return { type, payload };
};

export const deviceDataAll = (payload: DeviceDataAll) =>
  createAction(ActionTypes.DEVICE_DATA_ALL, payload);

export const deviceDataUpdate = (payload: DeviceDataUpdate) =>
  createAction(ActionTypes.DEVICE_DATA_UPDATE, payload);

export const psToolsResponse = (payload: PsToolsResponse) =>
  createAction(ActionTypes.PSTOOLS_RESPONSE, payload);

export const deviceCommandResponse = (payload: CommandResponse) =>
  createAction(ActionTypes.COMMAND_RESPONSE, payload);

export const singleRowSelect = (payload: { row: string | null }) =>
  createAction(ActionTypes.SINGLE_ROW_SELECT, payload);

export const multiRowSelect = (payload: { row: string | null }) =>
  createAction(ActionTypes.MULTI_ROW_SELECT, payload);

export const viewSelect = (payload: { view: string }) =>
  createAction(ActionTypes.VIEW_SELECT, payload);

export const proxyToggle = () => createAction(ActionTypes.PROXY_TOGGLE, {});

export const draggingSet = (payload: { isDragging: boolean }) =>
  createAction(ActionTypes.DRAGGING_SET, payload);

export const resetAll = () => createAction(ActionTypes.RESET_ALL, {});
