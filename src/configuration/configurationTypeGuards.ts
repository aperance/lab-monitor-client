import {Ajv} from "ajv";
import {Configuration} from "./configurationTypes";

// @ts-ignore
const ajv = new (require("ajv"))({verbose: true}) as Ajv;

const validateConfiguration = ajv.compile({
  properties: {
    title: {type: "string"},
    columns: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          property: {type: "string"},
          title: {type: "string"},
          replace: {
            type: "object",
            patternProperties: {"^.*$": {type: "string"}},
            additionalProperties: false
          }
        },
        required: ["property", "title"],
        additionalProperties: false
      }
    },
    filters: {
      type: "array",
      items: {
        type: "object",
        properties: {
          property: {type: "string"},
          title: {type: "string"},
          options: {
            type: "object",
            patternProperties: {"^.*$": {type: "string"}},
            additionalProperties: false
          }
        },
        required: ["property", "title", "options"],
        additionalProperties: false
      }
    },
    logLevel: {
      type: "object",
      properties: {
        level: {type: "array", minItems: 1, items: {type: "string"}},
        namespace: {type: "array", minItems: 1, items: {type: "string"}}
      },
      required: ["level", "namespace"],
      additionalProperties: false
    },
    httpProxy: {type: "string"},
    logsPath: {type: "string"},
    statePath: {type: "string"},
    psTools: {
      type: "object",
      patternProperties: {
        "^.*$": {
          type: "object",
          properties: {
            name: {type: "string"},
            mode: {type: "string"},
            cmd: {type: "string"}
          },
          required: ["name", "mode", "cmd"],
          additionalProperties: false
        }
      },
      additionalProperties: false
    },
    vnc: {
      type: "object",
      properties: {
        proxyUrl: {type: "string"},
        port: {type: "string"},
        username: {type: "string"},
        password: {type: "string"},
        passwordEncrypted: {type: "string"}
      },
      required: [
        "proxyUrl",
        "port",
        "username",
        "password",
        "passwordEncrypted"
      ],
      additionalProperties: false
    }
  },
  required: [
    "title",
    "columns",
    "filters",
    "logLevel",
    // "httpProxy",
    // "logsPath",
    // "statePath",
    // "psTools",
    "vnc"
  ],
  additionalProperties: false
});

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
