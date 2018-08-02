import {
  WsMessage,
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  DeviceActionResponse
} from "./types";

/**
 * Type guard for WsMessage interface
 *
 * @param {any} message
 * @returns {boolean}
 */
export const isWsMessage = (message: any): message is WsMessage => {
  if (
    typeof message.type === "string" &&
    typeof message.payload === "object" &&
    message.payload !== null
  )
    return true;
  else {
    console.error("WS message received with unexpected structure.");
    return false;
  }
};

// TODO: Complete type guards

/**
 * Type guard for DeviceDataAll interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
export const isDeviceDataAll = (payload: any): payload is DeviceDataAll => {
  if (payload) return true;
  else {
    console.error("Invalid device data received.");
    return false;
  }
};

/**
 * Type guard for DeviceDataUpdate interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
export const isDeviceDataUpdate = (
  payload: any
): payload is DeviceDataUpdate => {
  if (payload) return true;
  else {
    console.error("Invalid device data received.");
    return false;
  }
};

/**
 * Type guard for PsToolsResponse interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
export const isPsToolsResponse = (payload: any): payload is PsToolsResponse => {
  if (payload) return true;
  else {
    console.error("Invalid response received.");
    return false;
  }
};

/**
 * Type guard for DeviceActionResponse interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
export const isDeviceActionResponse = (
  payload: any
): payload is DeviceActionResponse => {
  if (payload) return true;
  else {
    console.error("Invalid response received.");
    return false;
  }
};
