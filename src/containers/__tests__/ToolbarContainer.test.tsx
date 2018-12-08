import * as React from "react";
import * as ReactTestingLibrary from "react-testing-library";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../../reducers/index";
import { ConfigurationContext } from "../../configuration/ConfigurationContext";
import ToolbarContainer from "../ToolbarContainer";

window.URL.createObjectURL = jest.fn();

afterEach(() => {
  ReactTestingLibrary.cleanup();
  jest.clearAllMocks();
});

const render = (
  element: JSX.Element,
  initialState: any,
  configuration: any
) => {
  const store = createStore(reducer, initialState);
  return ReactTestingLibrary.render(
    <Provider store={store}>
      <ConfigurationContext.Provider value={configuration}>
        {element}
      </ConfigurationContext.Provider>
    </Provider>
  );
};

const testConfiguration = {
  httpProxy: "255.255.255.255:1111",
  logsPath: "/testLogs/",
  vnc: {
    proxyUrl: "ws://255.255.255.255:2222",
    port: "9999",
    username: "testUser",
    password: "testPasword",
    passwordEncrypted: "0123456789abcdef"
  },
  logLevel: {
    level: ["LevelA", "LevelB", "LevelC"],
    namespace: ["NamespaceA", "NamespaceB", "NamespaceC"]
  }
};

test("renders full toolbar when zero rows are selected", () => {
  const testState = {
    userSelection: { rows: [], view: null, proxyEnabled: true }
  };
  const { getAllByRole, debug } = render(
    <ToolbarContainer />,
    testState,
    testConfiguration
  );
  debug();
  expect(getAllByRole("button").length).toEqual(13);
});

test("renders full toolbar when one row is selected", () => {
  const testState = {
    userSelection: { rows: ["0.0.0.0"], view: null, proxyEnabled: true }
  };
  const { getAllByRole, debug } = render(
    <ToolbarContainer />,
    testState,
    testConfiguration
  );
  debug();
  expect(getAllByRole("button").length).toEqual(13);
});

test("renders limited toolbar when two rows are selected", () => {
  const testState = {
    userSelection: {
      rows: ["0.0.0.0", "1.1.1.1"],
      view: null,
      proxyEnabled: true
    }
  };
  const { getAllByRole, debug } = render(
    <ToolbarContainer />,
    testState,
    testConfiguration
  );
  debug();
  expect(getAllByRole("button").length).toEqual(7);
});
