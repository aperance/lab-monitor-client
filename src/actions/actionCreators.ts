import {
  ActionTypeKeys,
  DeviceDataAllActionCreator,
  DeviceDataUpdateActionCreator,
  PsToolsResponseActionCreator,
  CommandResponseActionCreator,
  ResetAllActionCreator,
  SingleRowSelectActionCreator,
  MultiRowSelectActionCreator,
  ViewSelectActionCreator,
  ProxyToggleActionCreator,
  DraggingSetActionCreator
} from "./actionTypes";

export const deviceDataAll: DeviceDataAllActionCreator = payload => {
  return { ...payload, type: ActionTypeKeys.DEVICE_DATA_ALL };
};

export const deviceDataUpdate: DeviceDataUpdateActionCreator = payload => {
  return { ...payload, type: ActionTypeKeys.DEVICE_DATA_UPDATE };
};

export const psToolsResponse: PsToolsResponseActionCreator = payload => {
  return { ...payload, type: ActionTypeKeys.PSTOOLS_RESPONSE };
};

export const deviceCommandResponse: CommandResponseActionCreator = payload => {
  return { ...payload, type: ActionTypeKeys.COMMAND_RESPONSE };
};

export const singleRowSelect: SingleRowSelectActionCreator = row => {
  return { type: ActionTypeKeys.SINGLE_ROW_SELECT, row };
};

export const multiRowSelect: MultiRowSelectActionCreator = row => {
  return { type: ActionTypeKeys.MULTI_ROW_SELECT, row };
};

export const viewSelect: ViewSelectActionCreator = view => {
  return { type: ActionTypeKeys.VIEW_SELECT, view };
};

export const proxyToggle: ProxyToggleActionCreator = () => {
  return { type: ActionTypeKeys.PROXY_TOGGLE };
};

export const draggingSet: DraggingSetActionCreator = isDragging => {
  return { type: ActionTypeKeys.DRAGGING_SET, isDragging };
};

export const resetAll: ResetAllActionCreator = () => {
  return { type: ActionTypeKeys.RESET_ALL };
};
