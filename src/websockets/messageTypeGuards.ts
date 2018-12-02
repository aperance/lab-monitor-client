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
const ajv = new (require("ajv"))() as Ajv;

/**
 * Type guard for WsMessage interface
 *
 * @param {any} message
 * @returns {boolean}
 */
export const isWsMessage = (message: any): message is WsMessage => {
  const schema = {
    properties: {
      type: { type: "string" },
      payload: { type: "object", minProperties: 1 }
    },
    required: ["type", "payload"],
    additionalProperties: false
  };

  if (!ajv.validate(schema, message))
    throw new Error("Invalid websocket message received.");

  return true;
};

/**
 * Type guard for Configuration interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
export const isConfiguration = (payload: any): payload is Configuration => {
  const schema = {
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
  };

  if (!ajv.validate(schema, payload))
    throw Error("Invalid configuration received.");

  return true;
};

/**
 * Type guard for DeviceDataAll interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
export const isDeviceDataAll = (payload: any): payload is DeviceDataAll => {
  const schema = {
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
  };

  if (!ajv.validate(schema, payload))
    throw Error("Invalid device data received.");

  return true;
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
  const schema = {
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
  };

  if (!ajv.validate(schema, payload))
    throw Error("Invalid device data received.");

  return true;
};

// TODO: Complete type guards

/**
 * Type guard for PsToolsResponse interface
 *
 * @param {any} payload
 * @returns {boolean}
 */
export const isPsToolsResponse = (payload: any): payload is PsToolsResponse => {
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
 * @param {any} payload
 * @returns {boolean}
 */
export const isDeviceActionResponse = (
  payload: any
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
