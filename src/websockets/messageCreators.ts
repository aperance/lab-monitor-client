/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {WsMessageTypeKeys} from "./messageTypes";

/**
 * Request server to send a remote command to device using PSTools utilities.
 * @param target IP address of target device
 * @param mode PSExec or PSKill
 * @param argument arguments for command being sent
 */
export const psToolsRequest = (
  target: string,
  mode: string,
  argument: string
) => {
  return {
    type: WsMessageTypeKeys.PsToolsCommand,
    payload: {target, mode, argument}
  };
};

/**
 * Request server to send a remote command to device using its REST endpoints.
 * @param targets IP addresses of target devices
 * @param type
 * @param parameters
 */
export const commandRequest = (
  targets: string[],
  type: string,
  parameters: any = {}
) => {
  return {
    type: WsMessageTypeKeys.DeviceAction,
    payload: {targets, type, parameters}
  };
};

/**
 * Request server to refresh polling of device.
 * @param targets IP addresses of target devices
 */
export const refreshDevice = (targets?: string[]) => {
  return {
    type: WsMessageTypeKeys.RefreshDevice,
    payload: {targets}
  };
};

/**
 * Request server to erase device state from memory.
 * @param targets IP addresses of target devices
 */
export const clearDevice = (targets?: string[]) => {
  return {
    type: WsMessageTypeKeys.ClearDevice,
    payload: {targets}
  };
};
