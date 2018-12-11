import { WsMessageTypeKeys } from "./messageTypes";

export const psToolsRequest = (
  target: string,
  mode: string,
  argument: string
) => {
  return {
    type: WsMessageTypeKeys.PsToolsCommand,
    payload: { target, mode, argument }
  };
};

export const commandRequest = (
  targets: string[],
  type: string,
  parameters: any = {}
) => {
  return {
    type: WsMessageTypeKeys.DeviceAction,
    payload: { targets, type, parameters }
  };
};

export const refreshDevice = (targets: string[]) => {
  return {
    type: WsMessageTypeKeys.RefreshDevice,
    payload: { targets }
  };
};

export const refreshDeviceAll = () => {
  return {
    type: WsMessageTypeKeys.RefreshDeviceAll
  };
};

export const clearDevice = (targets: string[]) => {
  return {
    type: WsMessageTypeKeys.ClearDevice,
    payload: { targets }
  };
};

export const clearDeviceAll = () => {
  return {
    type: WsMessageTypeKeys.ClearDeviceAll
  };
};
