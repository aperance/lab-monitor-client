import { Ajv } from "ajv";
import { Configuration } from "./configurationTypes";

// @ts-ignore
const ajv = new (require("ajv"))({ verbose: true }) as Ajv;

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
