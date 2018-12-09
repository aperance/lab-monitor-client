import * as React from "react";
import * as ReactTestingLibrary from "react-testing-library";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers/index";
import { ConfigurationContext } from "../configuration/ConfigurationContext";
import WebPageConatiner from "../containers/WebPageContainer";

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
  httpProxy: "255.255.255.255:9999",
  statePath: "/test?state=path"
};

test("does not render when zero rows are selected", () => {
  const testState = {
    userSelection: { rows: [], proxy: true }
  };
  const { container } = render(
    <WebPageConatiner />,
    testState,
    testConfiguration
  );
  expect(container.querySelectorAll("a").length).toEqual(0);
  expect(container.querySelectorAll("iframe").length).toEqual(0);
});

test("does not render when two rows are selected", () => {
  const testState = {
    userSelection: { rows: ["0.0.0.0", "1.1.1.1"], proxy: false }
  };
  const { container } = render(
    <WebPageConatiner />,
    testState,
    testConfiguration
  );
  expect(container.querySelectorAll("a").length).toEqual(0);
  expect(container.querySelectorAll("iframe").length).toEqual(0);
});

test("does render when one row is selected, proxy enabled", () => {
  const testState = {
    userSelection: { rows: ["0.0.0.0"], proxy: true }
  };
  const { container } = render(
    <WebPageConatiner />,
    testState,
    testConfiguration
  );
  const expectedPath =
    "http://255.255.255.255:9999/test?state=path&target=0.0.0.0";
  expect(container.querySelectorAll("a").length).toEqual(1);
  expect(container.querySelectorAll("a")[0].href).toEqual(expectedPath);
  expect(container.querySelectorAll("iframe").length).toEqual(1);
  expect(container.querySelectorAll("iframe")[0].src).toEqual(expectedPath);
});

test("does render when one row is selected, proxy disabled", () => {
  const testState = {
    userSelection: { rows: ["0.0.0.0"], proxy: false }
  };
  const { container } = render(
    <WebPageConatiner />,
    testState,
    testConfiguration
  );
  const expectedPath = "http://0.0.0.0:8001/test?state=path";
  expect(container.querySelectorAll("a").length).toEqual(1);
  expect(container.querySelectorAll("a")[0].href).toEqual(expectedPath);
  expect(container.querySelectorAll("iframe").length).toEqual(1);
  expect(container.querySelectorAll("iframe")[0].src).toEqual(expectedPath);
});
