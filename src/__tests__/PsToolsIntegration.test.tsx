import * as React from "react";
import * as ReactTestingLibrary from "react-testing-library";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers/index";
import { ConfigurationContext } from "../configuration/ConfigurationContext";
import PsToolsContainer from "../containers/PsToolsContainer";

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
  psTools: {
    testCommandOne: {
      name: "Test Command One",
      mode: "psExec",
      cmd: '"C:\\Program Files (x86)\\test.exe"'
    },
    testCommandTwo: {
      name: "Test Command Two",
      mode: "psKill",
      cmd: "test.exe"
    }
  }
};

test("does not render when zero rows are selected", () => {
  const testState = {
    userSelection: { rows: [] },
    deviceResponse: { psTools: { result: null } }
  };
  const { container } = render(
    <PsToolsContainer />,
    testState,
    testConfiguration
  );
  expect(container.querySelectorAll("form").length).toEqual(0);
  expect(container.querySelectorAll("pre").length).toEqual(0);
});

test("does not render when two rows are selected", () => {
  const testState = {
    userSelection: { rows: ["0.0.0.0", "1.1.1.1"] },
    deviceResponse: { psTools: { result: null } }
  };
  const { container } = render(
    <PsToolsContainer />,
    testState,
    testConfiguration
  );
  expect(container.querySelectorAll("form").length).toEqual(0);
  expect(container.querySelectorAll("pre").length).toEqual(0);
});

test("does render when one row is selected, without result string", () => {
  const testState = {
    userSelection: { rows: ["0.0.0.0"] },
    deviceResponse: { psTools: { result: null } }
  };
  const { container } = render(
    <PsToolsContainer />,
    testState,
    testConfiguration
  );
  expect(container.querySelectorAll("form").length).toEqual(2);
  expect(container.querySelectorAll("pre").length).toEqual(0);
});

test("does render when one row is selected, with result string", () => {
  const testState = {
    userSelection: { rows: ["0.0.0.0"] },
    deviceResponse: { psTools: { result: "Test result string" } }
  };
  const { container } = render(
    <PsToolsContainer />,
    testState,
    testConfiguration
  );
  expect(container.querySelectorAll("form").length).toEqual(2);
  expect(container.querySelectorAll("pre").length).toEqual(1);
  expect(container.querySelectorAll("pre")[0].textContent).toEqual(
    "Test result string"
  );
});

test("does render when one row is selected, with result string", () => {
  const testState = {
    userSelection: { rows: ["0.0.0.0"] },
    deviceResponse: { psTools: { result: "Test result string" } }
  };
  const { getAllByRole } = render(
    <PsToolsContainer />,
    testState,
    testConfiguration
  );
  ReactTestingLibrary.fireEvent.click(getAllByRole("button")[0]);
  expect(getAllByRole("option").length).toEqual(2);
  expect(getAllByRole("option")[0].textContent).toEqual("Test Command One");
  expect(getAllByRole("option")[1].textContent).toEqual("Test Command Two");
});
