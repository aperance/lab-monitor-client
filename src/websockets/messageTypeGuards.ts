import {Ajv} from "ajv";
import {
  WsMessage,
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  CommandResponse
} from "./messageTypes";

const ajv = new (require("ajv"))({verbose: true, nullable: true}) as Ajv;

const validateWsMessage = ajv.compile({
  properties: {
    type: {type: "string"},
    payload: {type: "object", minProperties: 1}
  },
  required: ["type", "payload"],
  additionalProperties: false
});

const validateDeviceDataAll = ajv.compile({
  properties: {
    state: {
      type: "object",
      minProperties: 1,
      patternProperties: {
        "^.*$": {
          type: "object",
          minProperties: 1,
          patternProperties: {
            "^.*$": {type: "string"}
          }
        }
      }
    },
    history: {
      type: "object",
      minProperties: 1,
      patternProperties: {
        "^.*$": {
          type: "object",
          minProperties: 1,
          patternProperties: {
            "^.*$": {
              type: "array",
              minItems: 1,
              additionalItems: false,
              items: {
                type: "array",
                maxItems: 2,
                minItems: 2,
                additionalItems: false,
                items: [{type: "string"}, {type: ["string", "null"]}]
              }
            }
          }
        }
      }
    }
  },
  required: ["state", "history"],
  additionalProperties: false
});

const validateDeviceDataUpdate = ajv.compile({
  properties: {
    id: {type: "string", minLength: 1},
    state: {
      type: "object",
      nullable: true,
      minProperties: 1,
      patternProperties: {
        "^.*$": {type: ["string", "null"]}
      }
    },
    history: {
      type: "array",
      nullable: true,
      additionalItems: false,
      items: {
        type: "array",
        maxItems: 2,
        minItems: 2,
        additionalItems: false,
        items: [
          {type: "string", minLength: 1},
          {
            type: "array",
            maxItems: 2,
            minItems: 2,
            additionalItems: false,
            items: [{type: "string", minLength: 1}, {type: ["string", "null"]}]
          }
        ]
      }
    }
  },
  required: ["id", "state", "history"],
  additionalProperties: false
});

const validatePsToolsResponse = ajv.compile({
  properties: {
    err: {type: ["string", "object", "null"]},
    result: {type: ["string", "null"]}
  },
  required: ["err", "result"],
  additionalProperties: false
});

const validateDeviceActionResponse = ajv.compile({
  properties: {
    err: {type: ["string", "object", "null"]},
    results: {type: ["array", "null"]}
  },
  required: ["err", "results"],
  additionalProperties: false
});

/**
 * Type guard for WsMessage interface
 *
 * @param {unknown} message
 * @returns {boolean}
 */
export const isWsMessage = (message: unknown): message is WsMessage => {
  const isValid = validateWsMessage(message);
  if (validateWsMessage.errors)
    console.error({
      ...validateWsMessage.errors[0],
      data: message,
      schema: "WsMessage"
    });
  return isValid as boolean;
};

/**
 * Type guard for DeviceDataAll interface
 *
 * @param {unknown} payload
 * @returns {boolean}
 */
export const isDeviceDataAll = (payload: unknown): payload is DeviceDataAll => {
  const isValid = validateDeviceDataAll(payload);
  if (validateDeviceDataAll.errors)
    console.error({
      ...validateDeviceDataAll.errors[0],
      data: payload,
      schema: "DeviceDataAll"
    });
  return isValid as boolean;
};

/**
 * Type guard for DeviceDataUpdate interface
 *
 * @param {unknown} payload
 * @returns {boolean}
 */
export const isDeviceDataUpdate = (
  payload: unknown
): payload is DeviceDataUpdate => {
  const isValid = validateDeviceDataUpdate(payload);
  if (validateDeviceDataUpdate.errors)
    console.error({
      ...validateDeviceDataUpdate.errors[0],
      data: payload,
      schema: "DeviceDataUpdate"
    });
  return isValid as boolean;
};

/**
 * Type guard for PsToolsResponse interface
 *
 * @param {unknown} payload
 * @returns {boolean}
 */
export const isPsToolsResponse = (
  payload: unknown
): payload is PsToolsResponse => {
  const isValid = validatePsToolsResponse(payload);
  if (validatePsToolsResponse.errors)
    console.error({
      ...validatePsToolsResponse.errors[0],
      data: payload,
      schema: "DeviceDataUpdate"
    });
  return isValid as boolean;
};

/**
 * Type guard for DeviceActionResponse interface
 *
 * @param {unknown} payload
 * @returns {boolean}
 */
export const isDeviceActionResponse = (
  payload: unknown
): payload is CommandResponse => {
  const isValid = validateDeviceActionResponse(payload);
  if (validateDeviceActionResponse.errors)
    console.error({
      ...validateDeviceActionResponse.errors[0],
      data: payload,
      schema: "DeviceDataUpdate"
    });
  return isValid as boolean;
};
