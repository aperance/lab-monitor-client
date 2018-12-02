import { Ajv } from "ajv";
import {
  WsMessage,
  Configuration,
  DeviceDataAll,
  DeviceDataUpdate,
  PsToolsResponse,
  DeviceActionResponse
} from "./messageTypes";

// tslint:disable-next-line:no-var-requires
const ajv = new (require("ajv"))({ verbose: true }) as Ajv;

const validateWsMessage = ajv.compile({
  properties: {
    type: { type: "string" },
    payload: { type: "object", minProperties: 1 }
  },
  required: ["type", "payload"],
  additionalProperties: false
});

const validateConfiguration = ajv.compile({
  properties: {
    title: { type: "string" },
    columns: { type: "array", items: { type: "object" } },
    filters: { type: "array", items: { type: "object" } },
    logLevel: { type: "object", required: ["level", "namespace"] },
    httpProxy: { type: "string" },
    logsPath: { type: "string" },
    statePath: { type: "string" },
    psTools: { type: "object" },
    vnc: {
      type: "object",
      required: [
        "proxyUrl",
        "port",
        "username",
        "password",
        "passwordEncrypted"
      ]
    }
  },
  required: [
    "title",
    "columns",
    "filters",
    "logLevel",
    "httpProxy",
    "logsPath",
    "statePath",
    "psTools",
    "vnc"
  ],
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
            "^.*$": { type: "string" }
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
                items: [{ type: "string" }, { type: ["string", "null"] }]
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
    id: { type: "string", minLength: 1 },
    state: {
      type: "object",
      minProperties: 1,
      patternProperties: {
        "^.*$": { type: ["string", "null"] }
      }
    },
    history: {
      type: "array",
      additionalItems: false,
      items: {
        type: "array",
        maxItems: 2,
        minItems: 2,
        additionalItems: false,
        items: [
          { type: "string", minLength: 1 },
          {
            type: "array",
            maxItems: 2,
            minItems: 2,
            additionalItems: false,
            items: [
              { type: "string", minLength: 1 },
              { type: ["string", "null"] }
            ]
          }
        ]
      }
    }
  },
  required: ["id", "state", "history"],
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
 * Type guard for Configuration interface
 *
 * @param {unknown} payload
 * @returns {boolean}
 */
export const isConfiguration = (payload: unknown): payload is Configuration => {
  const isValid = validateConfiguration(payload);
  if (validateConfiguration.errors)
    console.error({
      ...validateConfiguration.errors[0],
      data: payload,
      schema: "Configuration"
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
  const schema = {
    properties: {
      err: { type: ["string", "object", "null"] },
      result: { type: ["string", "null"] }
    },
    required: ["err", "result"],
    additionalProperties: false
  };

  if (!ajv.validate(schema, payload)) {
    console.error("Invalid response received.");
    return false;
  }

  return true;
};

/**
 * Type guard for DeviceActionResponse interface
 *
 * @param {unknown} payload
 * @returns {boolean}
 */
export const isDeviceActionResponse = (
  payload: unknown
): payload is DeviceActionResponse => {
  const schema = {
    properties: {
      err: { type: ["string", "object", "null"] },
      results: { type: ["array", "null"] }
    },
    required: ["err", "results"],
    additionalProperties: false
  };

  if (!ajv.validate(schema, payload)) {
    console.error("Invalid response received.");
    return false;
  }

  return true;
};
