import { Actions, ActionTypeKeys } from "../actions/actionTypes";
import { Configuration } from "../websockets/messageTypes";

interface UninitializedState {
  received: false;
}

interface InitializedState extends Configuration {
  received: true;
}

type ConfigurationState = InitializedState | UninitializedState;

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
