import {
  ActionTypeKeys,
  DeviceDataAllAction,
  DeviceDataUpdateAction,
  PsToolsResponseAction,
  DeviceActionResponseSetAction,
  DeviceActionResponseClearAction,
  ResetAllAction,
  SingleRowSelectAction,
  MultiRowSelectAction,
  ViewSelectAction,
  ProxyToggleAction,
  DraggingSetAction
} from "./actionTypes";
import {
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  DeviceActionResponse
} from "../websockets/messageTypes";

export const configuration = (payload: any): any => {
  return { configuration: { ...payload }, type: ActionTypeKeys.CONFIGURATION };
};

export const deviceDataAll = (payload: DeviceDataAll): DeviceDataAllAction => {
  return { ...payload, type: ActionTypeKeys.DEVICE_DATA_ALL };
};

export const deviceDataUpdate = (
  payload: DeviceDataUpdate
): DeviceDataUpdateAction => {
  return { ...payload, type: ActionTypeKeys.DEVICE_DATA_UPDATE };
};

export const psToolsResponse = (
  payload: PsToolsResponse
): PsToolsResponseAction => {
  return { ...payload, type: ActionTypeKeys.PSTOOLS_RESPONSE };
};

export const actionResponseSet = (
  payload: DeviceActionResponse
): DeviceActionResponseSetAction => {
  return { ...payload, type: ActionTypeKeys.ACTION_RESPONSE_SET };
};

export const actionResponseClear = (): DeviceActionResponseClearAction => {
  return { type: ActionTypeKeys.ACTION_RESPONSE_CLEAR };
};

export const resetAll = (): ResetAllAction => {
  return { type: ActionTypeKeys.RESET_ALL };
};

export const singleRowSelect = (row: string | null): SingleRowSelectAction => {
  return { type: ActionTypeKeys.SINGLE_ROW_SELECT, row };
};

export const multiRowSelect = (row: string | null): MultiRowSelectAction => {
  return { type: ActionTypeKeys.MULTI_ROW_SELECT, row };
};

export const viewSelect = (view: string): ViewSelectAction => {
  return { type: ActionTypeKeys.VIEW_SELECT, view };
};

export const proxyToggle = (): ProxyToggleAction => {
  return { type: ActionTypeKeys.PROXY_TOGGLE };
};

export const draggingSet = (isDragging: boolean): DraggingSetAction => {
  return { type: ActionTypeKeys.DRAGGING_SET, isDragging };
};
