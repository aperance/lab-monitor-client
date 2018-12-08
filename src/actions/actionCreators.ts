import {
  ActionTypeKeys,
  DeviceDataAllAction,
  DeviceDataUpdateAction,
  PsToolsResponseAction,
  CommandResponseAction,
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
  CommandResponse
} from "../websockets/messageTypes";

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

export const deviceCommandResponse = (
  payload: CommandResponse
): CommandResponseAction => {
  return { ...payload, type: ActionTypeKeys.COMMAND_RESPONSE };
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
