import { WsMessageTypeKeys } from "./messageTypes";

export const psToolsCommand = (
  target: string,
  mode: string,
  argument: string
) => {
  return {
    type: WsMessageTypeKeys.PsToolsCommand,
    payload: { target, mode, argument }
  };
};

export const deviceCommand = (
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

export const clearDevice = (targets: string[]) => {
  return {
    type: WsMessageTypeKeys.ClearDevice,
    payload: { targets }
  };
};
