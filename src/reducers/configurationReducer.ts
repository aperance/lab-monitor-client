import { Actions, ActionTypeKeys } from "../actions/actionTypes";
// @ts-ignore
// import initialState from "../config.json";

interface State {
  title: string | null;
  columns: Array<{
    property: string;
    title: string;
    replace?: {
      [x: string]: string;
    };
  }>;
  filters: Array<{
    property: string;
    title: string;
    options: {
      [x: string]: string;
    };
  }>;
  logLevel: {
    level: string[];
    namespace: string[];
  };
  httpProxy: string | null;
  logsPath: string | null;
  statePath: string | null;
  psTools: {
    [x: string]: {
      name: string;
      mode: string;
      cmd: string;
    };
  };
  vnc: {
    proxyUrl: string | null;
    port: string | null;
    username: string | null;
    password: string | null;
    passwordEncrypted: string | null;
  };
}

const initialState = {
  title: null,
  columns: [],
  filters: [],
  logLevel: {
    level: [],
    namespace: []
  },
  httpProxy: null,
  logsPath: null,
  statePath: null,
  psTools: {},
  vnc: {
    proxyUrl: null,
    port: null,
    username: null,
    password: null,
    passwordEncrypted: null
  }
};

const configurationReducer = (state: State = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypeKeys.CONFIGURATION:
      return { ...(action.configuration as State) };
    default:
      return { ...state };
  }
};

export { configurationReducer, State as ConfigurationState };

// import * as Ajv from "ajv";

// const ajv = new Ajv();

// export const isDeviceStoreConfig = (
//   data: unknown
// ): data is DeviceStoreConfig => {
//   const schema = {
//     properties: {
//       maxHistory: {
//         type: "number"
//       },
//       dateFormat: {
//         type: "object"
//       }
//     },
//     required: ["maxHistory", "dateFormat"],
//     additionalProperties: false
//   };
//   return ajv.validate(schema, data) ? true : false;
// };
