import * as React from "react";
import * as ReactTestingLibrary from "react-testing-library";
import { createStore, Dispatch } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers/index";
import { ConfigurationContext } from "../configuration/ConfigurationContext";
import DeviceTableContainer from "../containers/DeviceTableContainer";
import { fireEvent } from "react-testing-library";

afterEach(() => {
  ReactTestingLibrary.cleanup();
  jest.clearAllMocks();
});

const dispatchMock = jest.fn();

const render = (
  element: JSX.Element,
  initialState: any,
  configuration: any
) => {
  const store = createStore(reducer, initialState);
  store.dispatch = dispatchMock as Dispatch;
  return ReactTestingLibrary.render(
    <Provider store={store}>
      <ConfigurationContext.Provider value={configuration}>
        {element}
      </ConfigurationContext.Provider>
    </Provider>
  );
};

const mockColumns = [
  { property: "PROPERTY_ONE", title: "Property One" },
  { property: "PROPERTY_TWO", title: "Property Two" },
  { property: "PROPERTY_THREE", title: "Property Three" }
];

const mockFilters = [
  {
    property: "PROPERTY_ONE",
    title: "Property1 Filter",
    options: { Option1: "\\b(Option1)\\b", Option2: "\\b(Option2)\\b" }
  },
  {
    property: "PROPERTY_TWO",
    title: "Property2 Filter",
    options: { Option1: "\\b(Option1)\\b", Option2: "\\b(Option2)\\b" }
  }
];

const mockTableData = {
  "0.0.0.0": {
    PROPERTY_ONE: "Property1_Value1",
    PROPERTY_TWO: "Property2_Value1",
    PROPERTY_THREE: "Property3_Value1"
  },
  "1.1.1.1": {
    PROPERTY_ONE: "Property1_Value2",
    PROPERTY_TWO: "Property2_Value2",
    PROPERTY_THREE: "Property3_Value2"
  }
};

test("renders filter bar with configured options", () => {
  const mockUserSelection = { rows: [], proxy: true, dragging: false };
  const { container } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: {} },
    { filters: mockFilters, columns: mockColumns }
  );
  expect(container.querySelectorAll("label").length).toEqual(7);
  expect(container.querySelectorAll("label")[0].textContent).toEqual(
    "Property1 Filter"
  );
  expect(container.querySelectorAll("label")[3].textContent).toEqual(
    "Property2 Filter"
  );
});

test("renders filter bar with proxy enabled", () => {
  const mockUserSelection = { rows: [], proxy: true, dragging: false };
  const { container, debug } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: {} },
    { filters: [], columns: mockColumns }
  );
  debug();
  expect(container.querySelectorAll("input").length).toEqual(1);
  expect(container.querySelectorAll("input")[0].checked).toEqual(false);
});

test("renders filter bar with proxy disabled", () => {
  const mockUserSelection = { rows: [], proxy: false, dragging: false };
  const { container, debug } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: {} },
    { filters: [], columns: mockColumns }
  );
  debug();
  expect(container.querySelectorAll("input").length).toEqual(1);
  expect(container.querySelectorAll("input")[0].checked).toEqual(true);
});

test("renders device table without data", () => {
  const mockUserSelection = { rows: [], proxy: true, dragging: false };
  const { container } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: {} },
    { filters: [], columns: mockColumns }
  );
  expect(container.querySelectorAll("tr").length).toEqual(1);
  expect(container.querySelectorAll("th").length).toEqual(4);
});

test("renders device table with data", () => {
  const mockUserSelection = { rows: [], proxy: true, dragging: false };
  const { container } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: mockTableData },
    { filters: [], columns: mockColumns }
  );
  expect(container.querySelectorAll("tr").length).toEqual(3);
  expect(container.querySelectorAll("td").length).toEqual(8);
  expect(container.querySelectorAll("td")[1].textContent).toEqual(
    "Property1_Value1"
  );
  expect(container.querySelectorAll("td")[7].textContent).toEqual(
    "Property3_Value2"
  );
});

test("renders with zero rows selected", () => {
  const mockUserSelection = { rows: [], proxy: true, dragging: false };
  const { container } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: mockTableData },
    { filters: [], columns: mockColumns }
  );
  expect(container.querySelectorAll("tr").length).toEqual(3);
  expect(
    JSON.stringify(container.querySelectorAll("tr")[1].classList)
  ).not.toMatch(/selected/);
  expect(
    JSON.stringify(container.querySelectorAll("tr")[2].classList)
  ).not.toMatch(/selected/);
});

test("renders with one row selected", () => {
  const mockUserSelection = { rows: ["1.1.1.1"], proxy: true, dragging: false };
  const { container } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: mockTableData },
    { filters: [], columns: mockColumns }
  );
  expect(container.querySelectorAll("tr").length).toEqual(3);
  expect(
    JSON.stringify(container.querySelectorAll("tr")[1].classList)
  ).not.toMatch(/selected/);
  expect(JSON.stringify(container.querySelectorAll("tr")[2].classList)).toMatch(
    /selected/
  );
});

test("renders with two rows selected", () => {
  const mockUserSelection = {
    rows: ["0.0.0.0", "1.1.1.1"],
    proxy: true,
    dragging: false
  };
  const { container } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: mockTableData },
    { filters: [], columns: mockColumns }
  );
  expect(container.querySelectorAll("tr").length).toEqual(3);
  expect(JSON.stringify(container.querySelectorAll("tr")[1].classList)).toMatch(
    /selected/
  );
  expect(JSON.stringify(container.querySelectorAll("tr")[2].classList)).toMatch(
    /selected/
  );
});

test("SINGLE_ROW_SELECT action dispatched", () => {
  const mockUserSelection = { rows: [], proxy: true, dragging: false };
  const { container } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: mockTableData },
    { filters: [], columns: mockColumns }
  );
  expect(container.querySelectorAll("tr").length).toEqual(3);
  fireEvent.click(container.querySelectorAll("tr")[1]);
  expect(dispatchMock).toBeCalledWith({
    type: "SINGLE_ROW_SELECT",
    payload: { row: "0.0.0.0" }
  });
});

test("MULTI_ROW_SELECT action dispatched", () => {
  const mockUserSelection = { rows: [], proxy: true, dragging: false };
  const { container } = render(
    <DeviceTableContainer />,
    { userSelection: mockUserSelection, tableData: mockTableData },
    { filters: [], columns: mockColumns }
  );
  expect(container.querySelectorAll("tr").length).toEqual(3);
  fireEvent.click(container.querySelectorAll("tr")[2], { ctrlKey: true });
  expect(dispatchMock).toBeCalledWith({
    type: "MULTI_ROW_SELECT",
    payload: { row: "1.1.1.1" }
  });
});
