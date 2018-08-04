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
    isNonEmptyObject(message) &&
    JSON.stringify(Object.keys(message).sort()) === '["payload","type"]' &&
    isNonEmptyObject(message.payload) &&
    typeof message.type === "string"
  )
    return true;
  else {
    console.error("WS message received with unexpected structure.");
    return false;
  }
};

/**
 * Type guard for DeviceDataAll interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
export const isDeviceDataAll = (payload: any): payload is DeviceDataAll => {
  if (
    JSON.stringify(Object.keys(payload).sort()) === '["history","state"]' &&
    /** Validate contents of state object */
    isNonEmptyObject(payload.state) &&
    Object.values(payload.state).every(
      byId =>
        isNonEmptyObject(byId) &&
        Object.values(byId).every(byProperty => typeof byProperty === "string")
    ) &&
    /** Validate contents of history object */
    isNonEmptyObject(payload.history) &&
    Object.values(payload.history).every(
      byId =>
        isNonEmptyObject(byId) &&
        Object.values(byId).every(
          byProperty =>
            Array.isArray(byProperty) &&
            byProperty.length !== 0 &&
            byProperty.every(
              record =>
                Array.isArray(record) &&
                record.length === 2 &&
                typeof record[0] === "string" &&
                (typeof record[1] === "string" || record[1] === null)
            )
        )
    )
  )
    return true;
  else {
    console.error("Invalid device data received.");
    return false;
  }
};

// TODO: Complete type guards

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

const isNonEmptyObject = (x: any) =>
  typeof x === "object" &&
  x !== null &&
  !Array.isArray(x) &&
  Object.values(x).length !== 0;
