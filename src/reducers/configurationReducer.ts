import { Actions, ActionTypeKeys } from "../actions/actionTypes";
import { Configuration } from "../websockets/messageTypes";

interface UninitializedState {
  received: false;
}

interface InitializedState extends Configuration {
  received: true;
}

type ConfigurationState = UninitializedState | InitializedState;

const initialState: ConfigurationState = {
  received: false
};

const configurationReducer = (
  state: ConfigurationState = initialState,
  action: Actions
): ConfigurationState => {
  switch (action.type) {
    case ActionTypeKeys.CONFIGURATION:
      return { ...action.configuration, received: true };
    default:
      return { ...state };
  }
};

export { configurationReducer, ConfigurationState };

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
