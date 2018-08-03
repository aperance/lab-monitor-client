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
    JSON.stringify(Object.keys(message).sort()) === '["payload","type"]' &&
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
  if (
    JSON.stringify(Object.keys(payload).sort()) === '["history","state"]' &&
    typeof payload.history === "object" &&
    typeof payload.state === "object" &&
    (payload.history !== null && payload.state !== null) &&
    (!Array.isArray(payload.history) && !Array.isArray(payload.state)) &&
    Object.values(payload.state).length !== 0 &&
    Object.values(payload.state).every(
      x => typeof x === "object" && x !== null && !Array.isArray(x)
    )
  )
    return true;
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
